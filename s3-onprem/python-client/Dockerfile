# Use the official Python image as the base image
FROM python:3

# Set the working directory inside the container
WORKDIR /app

# Copy the Python application into the container
COPY app.py /app/app.py

# Install the required libraries (boto3) inside the container
RUN pip install boto3

# Run the Python application
CMD ["python", "app.py"]
