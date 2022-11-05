import subprocess
import os
import signal
import time

# Routine to run the application
def runApp():
    # Change working directory
    os.chdir("frontend/")
    # Start React app
    react_app = subprocess.Popen(["npm", "start"])
    # Give React time to intitialize before starting electron
    time.sleep(5)
    # Start Electron
    electron_app = subprocess.Popen(["npm", "run", "electron-dev"])
    electron_app.wait()
    # Kill the React app
    print("Killing react app")
    os.killpg(os.getpgid(react_app.pid), signal.SIGTERM)

runApp()
