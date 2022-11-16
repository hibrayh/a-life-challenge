import subprocess
import os


def initVM():
    # Initialize the virtual environment
    print("Initializing virtual environment")
    os.chdir("backend/")
    initProcess = 0
    if os.name == 'nt':
        initProcess = subprocess.Popen(
            ["python3", "-m", "venv", "venv"], shell=True)
    else:
        initProcess = subprocess.Popen(["python3", "-m", "venv", "venv"])

    initProcess.wait()

    # Install dependencies
    print("Installing Flask on virtual environment")
    flaskProcess = 0
    flaskCorProcess = 0
    if os.name == 'nt':
        os.chdir("venv/Scripts/")
        flaskProcess = subprocess.Popen(
            ["pip.exe", "install", "Flask"], shell=True)
        flaskCorProcess = subprocess.Popen(
            ["pip.exe", "install", "flask-cors"], shell=True)
    else:
        os.chdir("venv/bin/")
        flaskProcess = subprocess.Popen(["./pip", "install", "Flask"])
        flaskCorProcess = subprocess.Popen(["./pip", "install", "flask-cors"])

    flaskProcess.wait()
    flaskCorProcess.wait()

    print("Completed installation")


initVM()
