# Use the Ubuntu 22.04 image to build from
FROM ubuntu:22.04
# Copy all the backend source code to the image
COPY ./src/ /backend/
# Install python3 and pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip
# Install python library dependencies
WORKDIR /backend/
RUN pip install noise
RUN pip install numpy
RUN pip install pillow
RUN pip install grpcio-tools
# Start up the backend service
CMD ["python3", "backend_server.py"]
