import requests

# API URL to which you want to upload the file
url = "http://localhost:3000/school"

# Path to the file you want to upload
file_path = "/home/user/TAKMIL-TASK/data.json"

# Open the file in binary mode
with open(file_path, 'rb') as file:
    # Prepare the file to be uploaded
    files =[
        ('file', ('data.json', file,'application/json'))
    ]
    # Optional: If the API requires any additional data or headers
    data = {}
    headers = {}

    # Make the POST request to upload the file
    response = requests.post(url, files=files, data={}, headers={})

# Check the response status
if response.status_code == 201:
    print("File uploaded successfully!")
else:
    print(f"Failed to upload file. Status code: {response.status_code}")
    print(f"Response: {response.text}")
