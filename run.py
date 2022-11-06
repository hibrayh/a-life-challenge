import subprocess
import os
import signal
import time

# Routine to run the application
def runApp():
    # Change working directory
    os.chdir("frontend/")
    # Start React app
    react_app = subprocess.Popen(["npm", "start"], shell=True)
    # Give React time to intitialize before starting electron
    time.sleep(5)
    # Start Electron
    electron_app = subprocess.Popen(["npm", "run", "electron-dev"], shell=True)
    electron_app.wait()
    # Kill the React app
    print("Killing react app")
    if os.name == 'nt':
        os.kill(react_app.pid, signal.CTRL_C_EVENT)
    else:
        os.killpg(os.getpgid(react_app.pid), signal.SIGTERM)

runApp()
