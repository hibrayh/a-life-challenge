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
        flaskProcess.wait()
        flaskCorProcess = subprocess.Popen(
            ["pip.exe", "install", "flask-cors"], shell=True)
        flaskCorProcess.wait()
        perlinNoiseProcess = subprocess.Popen(
            ["pip.exe", "install", "noise"], shell=True)
        perlinNoiseProcess.wait()
        numpyProcess = subprocess.Popen(["pip.exe", "install", "numpy"], shell=True)
        numpyProcess.wait()
        pillowProcess = subprocess.Popen(["pip.exe", "install", "pillow"], shell=True)
        pillowProcess.wait()
    else:
        os.chdir("venv/bin/")
        flaskProcess = subprocess.Popen(["./pip", "install", "Flask"])
        flaskProcess.wait()
        flaskCorProcess = subprocess.Popen(["./pip", "install", "flask-cors"])
        flaskCorProcess.wait()
        perlinNoiseProcess = subprocess.Popen(["./pip", "install", "noise"])
        perlinNoiseProcess.wait()
        numpyProcess = subprocess.Popen(["./pip", "install", "numpy"])
        numpyProcess.wait()
        pillowProcess = subprocess.Popen(["./pip", "install", "pillow"])
        pillowProcess.wait()

    print("Completed installation")


initVM()
