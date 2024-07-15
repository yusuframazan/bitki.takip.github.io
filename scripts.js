function loadPage(page) {
    switch (page) {
        case 'home':
            loadHomePage();
            break;
        case 'plants':
            loadPlantsPage();
            break;
        case 'about':
            loadAboutPage();
            break;
        case 'contact':
            loadContactPage();
            break;
        case 'history':
            loadDataHistory();
            break;
        case 'control':
            loadControlPage();
            break;
        default:
            loadHomePage();
    }
}

function loadHomePage() {
    document.getElementById("main-content").innerHTML = `
        <section class="plant-info">
            <h2>Bitki Bilgileri</h2>
            <p>Bitki Adı: <span id="plant-name">Domates</span></p>
            <p>Toprak Nem: <span id="soil-moisture">---</span>%</p>
            <p>Hava Sıcaklığı: <span id="current-temperature">---</span>°C</p>
            <p>Nem Oranı: <span id="current-humidity">---</span>%</p>
            <p>Işık Şiddeti: <span id="ldr-sensor">---</span>%</p>
        </section>

        <div class="controls">
            <button onclick="updateSensorData()">Verileri Güncelle</button>
            <!-- Diğer kontroller burada yer alabilir -->
        </div>

        <div class="chart-container">
            <canvas id="sensor-chart"></canvas>
        </div>
    `;
    updateSensorData(); // Sayfa yüklendiğinde verileri güncelle
}

function loadPlantsPage() {
    document.getElementById("main-content").innerHTML = `
        <h2>Bitkiler ve Bakım Bilgileri</h2>
        <p><strong>Domates:</strong></p>
        <ul>
            <li><strong>Toprak Nem Oranı:</strong> Nemli toprak sever.</li>
            <li><strong>Işık Şiddeti:</strong> Direkt güneş ışığı alan ortamları sever.</li>
            <li><strong>Sıcaklık:</strong> 18-24°C arası idealdir.</li>
            <li><strong>Sulama:</strong> Düzenli sulama yapılmalıdır.</li>
        </ul>
        <p><strong>Biber:</strong></p>
        <ul>
            <li><strong>Toprak Nem Oranı:</strong> Orta nemli toprakları tercih eder.</li>
            <li><strong>Işık Şiddeti:</strong> Bol güneş ışığı alan yerleri sever.</li>
            <li><strong>Sıcaklık:</strong> 20-25°C arası idealdir.</li>
            <li><strong>Sulama:</strong> Düzenli sulama yapılmalıdır, ancak fazla suya ihtiyaç duymaz.</li>
        </ul>
        <p><strong>Brokoli:</strong></p>
        <ul>
            <li><strong>Toprak Nem Oranı:</strong> Nemli ve iyi drenajlı toprakları tercih eder.</li>
            <li><strong>Işık Şiddeti:</strong> Yarı gölge alanlarda yetiştirilebilir.</li>
            <li><strong>Sıcaklık:</strong> 18-23°C arası idealdir.</li>
            <li><strong>Sulama:</strong> Toprağı sürekli nemli tutulmalıdır.</li>
        </ul>
        <p><strong>Salatalık:</strong></p>
        <ul>
            <li><strong>Toprak Nem Oranı:</strong> Yüksek nemli topraklar tercih eder.</li>
            <li><strong>Işık Şiddeti:</strong> Bol güneş ışığına ihtiyaç duyar.</li>
            <li><strong>Sıcaklık:</strong> 22-28°C arası idealdir.</li>
            <li><strong>Sulama:</strong> Sık ve düzenli sulama yapılmalıdır.</li>
        </ul>
    `;
}

function loadAboutPage() {
    document.getElementById("main-content").innerHTML = `
        <h1>Hakkımızda</h1>
        <p>Bitki İzleme Web Sitesi, bitkilerin sağlık durumunu izlemek ve kontrol etmek için tasarlanmıştır.</p>
        <p>Amacımız, bitkilerin doğru bakımını sağlamak ve kullanıcılara bitki yetiştirme sürecinde yardımcı olmaktır.</p>
        <p>Bizimle iletişime geçmekten çekinmeyin!</p>
    `;
}

function loadContactPage() {
    document.getElementById("main-content").innerHTML = `
        <h1>İletişim</h1>
        <p>Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz:</p>
        <ul>
            <li>Telefon: 123-456-7890</li>
            <li>E-posta: Yusuf@bitkiizleme.com</li>
            <li>Adres: İstiklal Cad. No: 123, Karabük, Türkiye</li>
        </ul>
        
        <div>
            <input type="radio" id="show-contact-form" name="form-type" onclick="toggleContactForm()">
            <label for="show-contact-form">İletişim Formunu Göster</label>
        </div>
        
        <section id="contact" class="contact-form">
            <h2>İletişim Formu</h2>
            <form id="contact-form" onsubmit="submitForm(event)">
                <label for="name">Adınız:</label><br>
                <input type="text" id="name" name="name" required><br>
                <label for="email">E-posta Adresiniz:</label><br>
                <input type="email" id="email" name="email" required><br>
                <label for="subject">Konu:</label><br>
                <input type="text" id="subject" name="subject" required><br>
                <label for="message">Mesajınız:</label><br>
                <textarea id="message" name="message" required></textarea><br>
                <button type="submit">Gönder</button>
            </form>
        </section>
    `;
}

function loadDataHistory() {
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/sensors.json')
        .then(response => response.json())
        .then(data => {
            let tableHTML = `
                <h2>Veri Geçmişi</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Zaman</th>
                            <th>Sıcaklık (°C)</th>
                            <th>Nem (%)</th>
                            <th>Toprak Nem Sensörü (%)</th>
                            <th>Işık Şiddeti</th>
                        </tr>
                    </thead>
                    <tbody>`;
            Object.keys(data).forEach(key => {
                const sensor = data[key];
                const time = new Date(sensor.time).toLocaleString();
                const temperature = sensor.temperature;
                const humidity = sensor.humidity;
                const soilMoisture = sensor.soilMoisture;
                const ldrSensor = sensor.ldrSensor;
                tableHTML += `
                    <tr>
                        <td>${time}</td>
                        <td>${temperature}</td>
                        <td>${humidity}</td>
                        <td>${soilMoisture}</td>
                        <td>${ldrSensor}</td>
                    </tr>`;
            });
            tableHTML += `
                    </tbody>
                </table>`;
            document.getElementById('main-content').innerHTML = tableHTML;
        })
        .catch(error => console.error('Veri alınırken hata oluştu:', error));
}

function loadControlPage() {
    document.getElementById("main-content").innerHTML = `
        <div class="container">
            <h2>Kontrol Paneli</h2>
            <div class="control-panel">
                <div>
                    <p>Fan Durumu: <span id="fan-status">Kapalı</span></p>
                    <button onclick="toggleFan()">Fanı Aç/Kapat</button>
                </div>
                <div>
                    <p>Su Motoru Durumu: <span id="water-pump-status">Kapalı</span></p>
                    <button onclick="toggleWaterPump()">Su Motorunu Aç/Kapat</button>
                </div>
            </div>
        </div>
    `;
    getControlStatus();
}

function getControlStatus() {
    const dbRef = firebase.database().ref('control');
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        document.getElementById('fan-status').textContent = data.fan ? 'Açık' : 'Kapalı';
        document.getElementById('water-pump-status').textContent = data.waterPump ? 'Açık' : 'Kapalı';
    });
}

function toggleFan() {
    const fanStatus = document.getElementById('fan-status').textContent === 'Kapalı';
    firebase.database().ref('control/fan').set(fanStatus);
}

function toggleWaterPump() {
    const pumpStatus = document.getElementById('water-pump-status').textContent === 'Kapalı';
    firebase.database().ref('control/waterPump').set(pumpStatus);
}

function updateSensorData() {
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/sensors.json')
        .then(response => response.json())
        .then(data => {
            const latestData = data[Object.keys(data).pop()];
            document.getElementById('plant-name').textContent = "Domates";
            document.getElementById('soil-moisture').textContent = latestData.soilMoisture;
            document.getElementById('current-temperature').textContent = latestData.temperature;
            document.getElementById('current-humidity').textContent = latestData.humidity;
            document.getElementById('ldr-sensor').textContent = latestData.ldrSensor;
            updateChart(data);
        })
        .catch(error => console.error('Veri alınırken hata oluştu:', error));
}

function updateChart(data) {
    const labels = Object.keys(data).map(key => new Date(data[key].time).toLocaleString());
    const temperatures = Object.keys(data).map(key => data[key].temperature);
    const humidities = Object.keys(data).map(key => data[key].humidity);
    const soilMoistures = Object.keys(data).map(key => data[key].soilMoisture);
    const ldrSensors = Object.keys(data).map(key => data[key].ldrSensor);

    const ctx = document.getElementById('sensor-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Sıcaklık (°C)',
                    data: temperatures,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Nem (%)',
                    data: humidities,
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Toprak Nem (%)',
                    data: soilMoistures,
                    borderColor: 'green',
                    fill: false
                },
                {
                    label: 'Işık Şiddeti',
                    data: ldrSensors,
                    borderColor: 'orange',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                }
            }
        }
    });
}

function toggleContactForm() {
    var formSection = document.getElementById('contact');
    if (document.getElementById('show-contact-form').checked) {
        formSection.style.display = 'block';
    } else {
        formSection.style.display = 'none';
    }
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    console.log(`Ad: ${name}\nE-posta: ${email}\nKonu: ${subject}\nMesaj: ${message}`);

    alert("Form başarıyla gönderildi!");
    document.getElementById('contact-form').reset();
}
