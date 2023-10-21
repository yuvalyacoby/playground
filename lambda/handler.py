import json
import boto3
import os

def hello(event, context):
    body_to_upload = {"firstName": "Jon", "LastName": "Doe"}
    s3 = boto3.client('s3', region_name=os.getenv("AWS_REGION"))
    s3.put_object(Bucket=os.getenv("BUCKET"), Key=os.getenv("BUCKET_KEY"), Body=json.dumps(body_to_upload, indent=4))
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """
