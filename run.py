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
        reactDepProcess = subprocess.Popen(
            ["npm", "install", "--force"], shell=True)
    else:
        reactDepProcess = subprocess.Popen(["npm", "install", "--force"])

    os.chdir("../")


def buildBackendImage():
    print("Building backend docker image")

    os.chdir("backend/")
    backendImageProcess = 0
    if os.name == 'nt':
        backendImageProcess = subprocess.Popen(
            ["docker", "build", "-t", "backend-image", "."], shell=True)
    else:
        backendImageProcess = subprocess.Popen(
            ["docker", "build", "-t", "backend-image", "."])

    backendImageProcess.wait()
    print("Backend docker image finished")
    os.chdir('../')


def buildReactImage():
    print("Building React docker image")

    os.chdir("frontend/")
    reactImageProcess = 0
    if os.name == 'nt':
        reactImageProcess = subprocess.Popen(
            ["docker", "build", "-t", "frontend-image", "."], shell=True)
    else:
        reactImageProcess = subprocess.Popen(
            ["docker", "build", "-t", "frontend-image", "."])

    reactImageProcess.wait()
    print("React docker image finished")
    os.chdir('../')


def buildProxyImage():
    print("Building proxy docker image")

    os.chdir("proxy/")
    proxyImageProcess = 0
    if os.name == 'nt':
        proxyImageProcess = subprocess.Popen(
            ["docker", "build", "-t", "proxy-image", "."], shell=True)
    else:
        proxyImageProcess = subprocess.Popen(
            ["docker", "build", "-t", "proxy-image", "."])

    proxyImageProcess.wait()
    print("proxy docker image finished")
    os.chdir('../')


def buildDockerImages():
    print("Building docker images...")

    buildBackendImage()
    buildReactImage()
    buildProxyImage()

    print("Done building docker images")


def startContainerNetwork():
    print("Creating new docker network to run A-Life Challenge applications within")

    if os.name == 'nt':
        subprocess.Popen(["docker", "network", "create",
                         "a-life-network"], shell=True)
    else:
        subprocess.Popen(["docker", "network", "create", "a-life-network"])

    print("Docker network `a-life-network` has been created")


def destroyContainerNetwork():
    print("Shutting down `a-life-network`")

    if os.name == 'nt':
        subprocess.Popen(["docker", "network", "rm",
                         "a-life-network"], shell=True)
    else:
        subprocess.Popen(["docker", "network", "rm", "a-life-network"])

    print("Network has been shutdown")


def startBackendContainer():
    print("Starting backend container")

    os.chdir("backend/")
    if os.name == 'nt':
        subprocess.Popen(["docker",
                          "run",
                          "--name",
                          "backend-service",
                          "--net",
                          "a-life-network",
                          "backend-image"],
                         shell=True)
    else:
        subprocess.Popen(["docker",
                          "run",
                          "--name",
                          "backend-service",
                          "--net",
                          "a-life-network",
                          "backend-image"])

    print("Container `backend-service` has been started")

    os.chdir("../")


def startReactContainer():
    print("Starting React container")

    os.chdir("frontend/")
    if os.name == 'nt':
        subprocess.Popen(["docker",
                          "run",
                          "-d",
                          "-p",
                          "3000:3000",
                          "--name",
                          "frontend-service",
                          "frontend-image"],
                         shell=True)
    else:
        subprocess.Popen(["docker",
                          "run",
                          "-d",
                          "-p",
                          "3000:3000",
                          "--name",
                          "frontend-service",
                          "frontend-image"])

    print("Container `frontend-service` has been started")

    os.chdir("../")


def startProxyContainer():
    print("Starting proxy container")

    os.chdir("proxy/")
    if os.name == 'nt':
        subprocess.Popen(["docker",
                          "run",
                          "-p",
                          "44039:44039",
                          "--name",
                          "proxy-service",
                          "--net",
                          "a-life-network",
                          "proxy-image"],
                         shell=True)
    else:
        subprocess.Popen(["docker",
                          "run",
                          "-p",
                          "44039:44039",
                          "--name",
                          "proxy-service",
                          "--net",
                          "a-life-network",
                          "proxy-image"])

    print("Container `proxy-service` has been started")

    os.chdir("../")


def startContainers():
    print("Starting docker containers")
    startBackendContainer()
    startReactContainer()
    startProxyContainer()
    time.sleep(5)
    print("All containers have been started")


def terminateContainers():
    print("Terminating containers")

    if os.name == 'nt':
        process = subprocess.Popen(
            ["docker", "kill", "backend-service"], shell=True)
        process.wait()
        process = subprocess.Popen(
            ["docker", "kill", "frontend-service"], shell=True)
        process.wait()
        process = subprocess.Popen(
            ["docker", "kill", "proxy-service"], shell=True)
        process.wait()
        process = subprocess.Popen(
            ["docker", "rm", "backend-service"], shell=True)
        process.wait()
        process = subprocess.Popen(
            ["docker", "rm", "frontend-service"], shell=True)
        process.wait()
        process = subprocess.Popen(
            ["docker", "rm", "proxy-service"], shell=True)
        process.wait()
    else:
        process = subprocess.Popen(["docker", "kill", "backend-service"])
        process.wait()
        process = subprocess.Popen(["docker", "kill", "frontend-service"])
        process.wait()
        process = subprocess.Popen(["docker", "kill", "proxy-service"])
        process.wait()
        process = subprocess.Popen(["docker", "rm", "backend-service"])
        process.wait()
        process = subprocess.Popen(["docker", "rm", "frontend-service"])
        process.wait()
        process = subprocess.Popen(["docker", "rm", "proxy-service"])
        process.wait()

    print("Containers terminated")


def runApp():
    installDependencies()
    buildDockerImages()
    startContainerNetwork()
    startContainers()

    # Start Electron
    print("Starting Electron")
    os.chdir("frontend/")
    electron_app = 0
    if os.name == 'nt':
        electron_app = subprocess.Popen(
            ["npm", "run", "electron-dev"], shell=True)
    else:
        electron_app = subprocess.Popen(["npm", "run", "electron-dev"])

    electron_app.wait()

    terminateContainers()
    destroyContainerNetwork()


runApp()
