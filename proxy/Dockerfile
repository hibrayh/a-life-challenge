FROM ubuntu:22.04
# Copy proxy configuration file
COPY ./browser_proxy.yaml /proxy/
# Install Envoy
RUN apt-get update && \
    apt-get install -y apt-transport-https gnupg2 curl lsb-release && \
    curl -sL 'https://deb.dl.getenvoy.io/public/gpg.8115BA8E629CC074.key' | gpg --dearmor -o /usr/share/keyrings/getenvoy-keyring.gpg && \
    echo a077cb587a1b622e03aa4bf2f3689de14658a9497a9af2c427bba5f4cc3c4723 /usr/share/keyrings/getenvoy-keyring.gpg | sha256sum --check && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/getenvoy-keyring.gpg] https://deb.dl.getenvoy.io/public/deb/ubuntu $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/getenvoy.list && \
    apt-get update && \
    apt-get install -y getenvoy-envoy
# Start up the proxy
WORKDIR /proxy/
CMD ["envoy", "-c", "browser_proxy.yaml"]
