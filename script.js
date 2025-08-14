        const localInput = document.getElementById("localUrl");
        const toggleLocalBtn = document.getElementById("toggleLocal");
        const estadoLocal = document.getElementById("estadoLocal");

        const baseNubeInput = document.getElementById("baseNube");
        const addNubeBtn = document.getElementById("addNube");
        const nubeLista = document.getElementById("nubeLista");

        let localSocket = null;
        let nubeSockets = [];

        function actualizarEstado(label, conectado) {
            label.textContent = conectado ? "Conectado" : "Desconectado";
            label.className = "status " + (conectado ? "conectado" : "desconectado");
        }

        function toggleConexionLocal() {
            if (localSocket && localSocket.readyState === WebSocket.OPEN) {
                localSocket.close();
            } else {
                try {
                    localSocket = new WebSocket(`ws://${localInput.value}`);
                    localSocket.onopen = () => {
                        toggleLocalBtn.textContent = "Desconectar";
                        actualizarEstado(estadoLocal, true);
                    };
                    localSocket.onclose = () => {
                        toggleLocalBtn.textContent = "Conectar";
                        actualizarEstado(estadoLocal, false);
                    };
                    localSocket.onmessage = (event) => {
                        nubeSockets.forEach(obj => {
                            if (obj.socket.readyState === WebSocket.OPEN) {
                                obj.socket.send(event.data);
                            }
                        });
                    };
                } catch (e) {
                    console.error("Error al conectar al servidor local:", e);
                }
            }
        }

        function generarMAC() {
            return 'xx:xx:xx:xx:xx:xx'.replace(/x/g, () =>
                Math.floor(Math.random() * 16).toString(16).toUpperCase()
            );
        }

        function añadirServidorNube() {
            const mac = generarMAC().replace(/:/g, '');
            const base = baseNubeInput.value.trim();
            if (!base) return alert("Introduce una URL base válida");
            const fullUrl = `wss://${base}/${mac}`;

            const socketObj = {
                mac,
                socket: null,
                conectado: false,
                labelEstado: null,
                btn: null
            };

            const fila = document.createElement("tr");

            const macCelda = document.createElement("td");
            const macLabel = document.createElement("span");
            macLabel.textContent = mac;
            macCelda.appendChild(macLabel);

            const urlCelda = document.createElement("td");
            const urlLabel = document.createElement("span");
            urlLabel.textContent = fullUrl;
            urlCelda.appendChild(urlLabel);

            const btnCelda = document.createElement("td");
            const btn = document.createElement("button");
            btn.textContent = "Conectar";
            btn.className = "w3-button w3-blue w3-small";

            const estadoCelda = document.createElement("td");
            const estado = document.createElement("span");
            estado.className = "status desconectado";
            estado.textContent = "Desconectado";

            btn.onclick = () => {
                if (socketObj.socket && socketObj.socket.readyState === WebSocket.OPEN) {
                    socketObj.socket.close();
                } else {
                    try {
                        const sock = new WebSocket(fullUrl);
                        socketObj.socket = sock;
                        sock.onopen = () => {
                            btn.textContent = "Desconectar";
                            actualizarEstado(estado, true);
                        };
                        sock.onclose = () => {
                            btn.textContent = "Conectar";
                            actualizarEstado(estado, false);
                        };
                        sock.onmessage = (event) => {
                            if (localSocket && localSocket.readyState === WebSocket.OPEN) {
                                localSocket.send(event.data);
                            }
                        };
                    } catch (e) {
                        console.error("Error al conectar a la nube:", e);
                    }
                }
            };

            socketObj.labelEstado = estado;
            socketObj.btn = btn;

            fila.appendChild(macCelda);
            fila.appendChild(urlCelda);
            fila.appendChild(btnCelda);
            btnCelda.appendChild(btn);
            fila.appendChild(estadoCelda);
            estadoCelda.appendChild(estado);

            nubeLista.appendChild(fila);
            nubeSockets.push(socketObj);
        }

        toggleLocalBtn.onclick = toggleConexionLocal;
        addNubeBtn.onclick = añadirServidorNube;