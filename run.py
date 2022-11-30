import subprocess
import os
import signal
import time


def installDependencies():
    # Install React dependencies
    print("Installing React dependencies")
    os.chdir("frontend/")
    reactDepProcess = 0
    if os.name == 'nt':
        reactDepProcess = subprocess.Popen(["npm", "install", "--force"], shell=True)
    else:
        reactDepProcess = subprocess.Popen(["npm", "install", "--force"])

    os.chdir("../")


def runApp():
    installDependencies()
    # Start the backend
    print("Starting Flask")
    os.chdir("backend/")
    backend = 0
    if os.name == 'nt':
        os.chdir("venv/Scripts/")
        backend = subprocess.Popen(
            ["flask.exe", "--app", "../../main", "run", "--host=0.0.0.0"], shell=True)
    else:
        os.chdir("venv/bin/")
        backend = subprocess.Popen(
            ["./flask", "--app", "../../main", "run", "--host=0.0.0.0"])

    # Start frontend
    print("Starting React")
    os.chdir("../../../frontend/")
    react_app = 0
    if os.name == 'nt':
        react_app = subprocess.Popen(["npm", "start"], shell=True)
    else:
        react_app = subprocess.Popen(["npm", "start"])

    # Give frontend and backend time to intitialize before starting electron
    time.sleep(5)

    # Start Electron
    print("Starting Electron")
    electron_app = 0
    if os.name == 'nt':
        electron_app = subprocess.Popen(
            ["npm", "run", "electron-dev"], shell=True)
    else:
        electron_app = subprocess.Popen(["npm", "run", "electron-dev"])

    electron_app.wait()

    # Kill the React app
    print("Killing React and Flask")
    if os.name == 'nt':
        os.kill(react_app.pid, signal.CTRL_C_EVENT)
        os.kill(backend.pid, signal.CTRL_C_EVENT)
    else:
        os.killpg(os.getpgid(react_app.pid), signal.SIGTERM)
        os.killpg(os.getpgid(backend.pid), signal.SIGTERM)


runApp()
