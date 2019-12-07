import json
import boto3
import os
import sys
import uuid
from botocore.vendored import requests
# from PIL import Image
# import PIL.Image
from datetime import *

ES_HOST = 'https://vpc-photos-qkm3k64zzsxv4efkv5kz5asvyi.us-east-1.es.amazonaws.com'
REGION = 'us-east-1'

def get_url(index, type):
    url = ES_HOST + '/' + index + '/' + type
    return url

def lambda_handler(event, context):
    print("EVENT --- {}".format(json.dumps(event)))

    headers = { "Content-Type": "application/json" }
    rek = boto3.client('rekognition')

    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        print("Bucket: " + bucket)
        key = record['s3']['object']['key']
        size = record['s3']['object']['size']
        print("Start Rekgonotion.")
        labels = rek.detect_labels(
            Image={
                'S3Object': {
                    'Bucket': bucket,
                    'Name': key
                }
            },
            MaxLabels=10
        )
        print("Labels: " + labels)

    obj = {}
    obj['objectKey'] = key
    obj["bucket"] = bucket
    obj["createdTimestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    obj["labels"] = []

    for label in labels['Labels']:
        obj["labels"].append(label['Name'])

    print("JSON OBJECT --- {}".format(obj))

    url = get_url('photos', 'Photo')
    print("ES URL --- {}".format(url))
    obj = json.dumps(obj)
    req = requests.post(url, data=obj, headers=headers)

    print("Success: ", req)
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        },
        'body': json.dumps("Image labels have been successfully detected!")
    }

# def resize_image(image_path, resized_path):
#     with Image.open(image_path) as image:
#         image.thumbnail(tuple(x / 2 for x in image.size))
#         image.save(resized_path)
