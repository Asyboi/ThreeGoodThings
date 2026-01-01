from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import base64
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timezone
from zoneinfo import ZoneInfo
from typing import Optional
from werkzeug.security import generate_password_hash, check_password_hash

# initialize Firebase from env vars and local dev
if os.environ.get("FIREBASE_SERVICE_ACCOUNT_BASE64"):
    decoded = base64.b64decode(
        os.environ["FIREBASE_SERVICE_ACCOUNT_BASE64"]
    ).decode("utf-8")

    firebase_cred = json.loads(decoded)
else:
    with open("key.json") as f:
        firebase_cred = json.load(f)

cred = credentials.Certificate(firebase_cred)
firebase_admin.initialize_app(cred)

db = firestore.client()
# Serve the React frontend directly from /app/frontend/build
build_dir = "/app/frontend/build"
app = Flask(__name__, static_folder=os.path.join(build_dir, "static"), template_folder=build_dir)
CORS(app)

# App single global timezone for simplicity (TODO: change to per-user timezone in the future)
APP_TZ = ZoneInfo("America/Chicago")

# date converter helper
def app_day_utc(dt: Optional[datetime] = None) -> datetime:
    if dt is None:
        dt = datetime.now(APP_TZ)

    local_midnight = dt.replace(
        hour=0, minute=0, second=0, microsecond=0
    )

    return local_midnight.astimezone(timezone.utc)

# User create
@app.route('/api/users/create', methods=['POST'])
def create_user():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # --------ERROR HANDLING--------

    # If username, email, or password are empty, 
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are all required"}), 400

    # query database to see if user with email already exists
    users_ref = db.collection("users")
    existing_users = users_ref.where("email", "==", email).get()
    if existing_users:
        # If a user is found, return an error message that a user with that email already exists
        return jsonify({"error": "A user with this email already exists"}), 400

    # --------HASH PASSWORD--------
    hashed_password = generate_password_hash(password)

    # Create new user object
    new_user = {
        "username": username,
        "email": email,
        "password": hashed_password  # password hashed for security
    }

    # TODO create new user in the database, let Firestore auto-generate the document ID
    new_user_ref = users_ref.document()
    new_user_ref.set(new_user)

    # TODO get the user_id from the newly created user and make sure to return it
    user_id = new_user_ref.id

    return jsonify({"message": "Account created", "user_id": user_id}), 201


# User login 
@app.route('/api/users/login', methods=['POST'])
def get_user():
    # get username and password from JSON body
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    users_ref = db.collection("users")
    matching_users = users_ref.where("username", "==", username).get()

    if not matching_users:
        # Else, return an error message
        return jsonify({"error": "User not found"}), 404

    # If it does, return a success message and their id
    user_doc = matching_users[0]
    user_data = user_doc.to_dict()

    # Check hashed password
    if not check_password_hash(user_data["password"], password):
        return jsonify({"error": "Invalid password"}), 401
    
    user_id = user_doc.id

    return jsonify({"message": "Login successful", "user_id": user_id}), 200


# Log Create
@app.route('/api/logs/create', methods=['POST'])
def create_log():
    data = request.json
    user_id = data.get("userId")
    things = data.get("things")

    user = db.collection("users").document(user_id).get()

    # normalized day field
    today_utc = app_day_utc()

    if not user.exists:
        return jsonify({"error": "User not found"}), 404

    if len(things) != 3 or any(not thing for thing in things):
        return jsonify({"error": "Exactly 3 good things are required."}), 400
    
    logs_ref = db.collection("logs")

    existing_log = (
        logs_ref
        .where("user_id", "==", user_id)
        .where("day", "==", today_utc)
        .get()
    )

    if existing_log:
        return jsonify({"error": "You already submitted a log today."}), 409

    body = {
        "thing_1": things[0],
        "thing_2": things[1],
        "thing_3": things[2]

    }

    new_log = {
        "user_id": user_id,
        "date": firestore.SERVER_TIMESTAMP,
        "day": today_utc,
        "body": body

    }

    new_log_ref = db.collection("logs").document()
    new_log_ref.set(new_log)
    return jsonify({"message": "Log creation successful"}), 201

# Log Get
# TODO: adapt function to handle users timezone
@app.route('/api/logs/get', methods=['GET'])
def get_log():
    user_id = request.args.get("userId")
    date = request.args.get("date") # in the format of MM-DD-YYYY

    if not user_id or not date:
        return jsonify({"error": "user_id and date query parameters required"}), 400 # 400 = bad request

    logs_ref = db.collection("logs")
    target_date = datetime.strptime(date, "%m-%d-%Y")
    target_date = target_date.replace(tzinfo=APP_TZ)

    target_date_utc = app_day_utc(target_date)

    target_query = (
        logs_ref
        .where("user_id", "==", user_id)
        .where("day", "==", target_date_utc)
        .get()
    )

    if not target_query:
        return jsonify({"error": "Log not found for this date", "target_query": len(target_query)}), 404 # 404 = not found
    
    return jsonify({"message": "Log found successfully", "log": target_query[0].to_dict()}), 200

# Database interaction examples:

#  Example Create/Update data
# @app.route('/users', methods=['POST'])
# def create_user():
#     user_data = jsonify({
#         "key" : "value",
#     })
#     user_ref = db.collection('users').document(user_data.get('id'))
#     user_ref.set(user_data)
#     return jsonify({"success": True}), 201

# Example Read data
# @app.route('/users', methods=['GET'])
# def get_all_users():
#     users_ref = db.collection('User')
#     docs = users_ref.stream()

#     users = []
#     for doc in docs:
#         user_data = doc.to_dict()
#         user_data['id'] = doc.id  # include doc ID if useful
#         users.append(user_data)

#     return jsonify(users)

# Example Delete data
# @app.route('/users/<user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     db.collection('users').document(user_id).delete()
#     return jsonify({"success": True}), 200
    
# Helper route to see all of the users currently in database
# To see this, go to localhost:5000/users on browser and add
@app.route('/users', methods=['GET'])
def get_all_users():
    users_ref = db.collection('users')
    docs = users_ref.stream()

    users = []
    for doc in docs:
        user_data = doc.to_dict()
        user_data['id'] = doc.id 
        users.append(user_data)

    return jsonify(users)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(build_dir, path)):
        return send_from_directory(build_dir, path)
    return send_from_directory(build_dir, "index.html")

# Run the app

if __name__ == '__main__':
    # Use PORT env var if available, otherwise default to 5001 for local testing (5000 is used by something else)
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=True, port=port, host="0.0.0.0")