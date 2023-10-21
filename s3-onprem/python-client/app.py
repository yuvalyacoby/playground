import boto3
import os
import json

s3 = boto3.client('s3', region_name=os.getenv("AWS_REGION"), endpoint_url=os.getenv("ONPREM_S3_ENDPOINT"))

def upload_to_s3(bucket_name, key, json_obj):
    json_str = json.dumps(json_obj)
    s3.put_object(Bucket=bucket_name, Key=key, Body=json_str)

def download_from_s3(bucket_name, key):
   response = s3.get_object(Bucket=bucket_name, Key=key)
   json_str = response['Body'].read().decode('utf-8')
   json_obj = json.loads(json_str)
   return json_obj

def list_s3_buckets():
    response = s3.list_buckets()

    buckets = response['Buckets']
    bucket_names = [bucket['Name'] for bucket in buckets]
    return bucket_names

if __name__ == "__main__":
    bucket_name = 'test-bucket'
    json_key = 'example.json'

    bucket_list = list_s3_buckets()
    print("S3 Buckets:")
    for bucket_name in bucket_list:
        print(bucket_name)

    json_obj_to_upload = {
        "name": "John Doe",
        "age": 30,
        "email": "john.doe@example.com"
    }

    upload_to_s3(bucket_name, json_key, json_obj_to_upload)
    print("JSON object uploaded to S3.")

    json_obj_to_download = download_from_s3(bucket_name, json_key)
    print("JSON object downloaded from S3:")
    print(json_obj_to_download)