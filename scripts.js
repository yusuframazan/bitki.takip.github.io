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
        case 'controls':
            loadControlsPage();
            break;
        default:
            loadHomePage();
    }
}

function loadControlsPage() {
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
    updateControlStatus(); // Firebase'den kontrol durumlarını güncelle
}

function updateControlStatus() {
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/control.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fan-status').textContent = data.fan ? 'Açık' : 'Kapalı';
            document.getElementById('water-pump-status').textContent = data.waterPump ? 'Açık' : 'Kapalı';
        })
        .catch(error => console.error('Kontrol durumu alınamadı:', error));
}

function toggleFan() {
    const fanStatus = document.getElementById('fan-status').textContent === 'Kapalı';
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/control.json', {
        method: 'PATCH',
        body: JSON.stringify({ fan: fanStatus }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            updateControlStatus();
        } else {
            console.error('Fan durumu güncellenemedi.');
        }
    })
    .catch(error => console.error('Fan durumu güncellenemedi:', error));
}

function toggleWaterPump() {
    const waterPumpStatus = document.getElementById('water-pump-status').textContent === 'Kapalı';
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/control.json', {
        method: 'PATCH',
        body: JSON.stringify({ waterPump: waterPumpStatus }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            updateControlStatus();
        } else {
            console.error('Su motoru durumu güncellenemedi.');
        }
    })
    .catch(error => console.error('Su motoru durumu güncellenemedi:', error));
}

document.addEventListener('DOMContentLoaded', updateControlStatus);

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
            <li>Adres: istiklal Cad. No: 123, Karabük, Türkiye</li>
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
            const container = document.createElement('div');
            container.className = 'container';
            
            const table = document.createElement('table');
            table.className = 'sensor-history-table';
            
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            const headers = ['Zaman', 'Toprak Nemi', 'Sıcaklık', 'Nem', 'Işık Şiddeti'];
            
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                tr.appendChild(th);
            });
            
            thead.appendChild(tr);
            table.appendChild(thead);
            
            const tbody = document.createElement('tbody');
            
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const entry = data[key];
                    const tr = document.createElement('tr');
                    
                    const tdTime = document.createElement('td');
                    tdTime.textContent = entry.timestamp;
                    tr.appendChild(tdTime);
                    
                    const tdSoilMoisture = document.createElement('td');
                    tdSoilMoisture.textContent = entry.soilMoisture;
                    tr.appendChild(tdSoilMoisture);
                    
                    const tdTemperature = document.createElement('td');
                    tdTemperature.textContent = entry.temperature;
                    tr.appendChild(tdTemperature);
                    
                    const tdHumidity = document.createElement('td');
                    tdHumidity.textContent = entry.humidity;
                    tr.appendChild(tdHumidity);
                    
                    const tdLight = document.createElement('td');
                    tdLight.textContent = entry.ldr;
                    tr.appendChild(tdLight);
                    
                    tbody.appendChild(tr);
                }
            }
            
            table.appendChild(tbody);
            container.appendChild(table);
            document.getElementById('main-content').innerHTML = '';
            document.getElementById('main-content').appendChild(container);
        })
        .catch(error => console.error('Veri geçmişi alınamadı:', error));
}

function updateSensorData() {
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/sensors/latest.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('plant-name').textContent = data.plantName || 'Domates';
            document.getElementById('soil-moisture').textContent = data.soilMoisture || '---';
            document.getElementById('current-temperature').textContent = data.temperature || '---';
            document.getElementById('current-humidity').textContent = data.humidity || '---';
            document.getElementById('ldr-sensor').textContent = data.ldr || '---';
            updateChart(data.history);
        })
        .catch(error => console.error('Sensor verileri alınamadı:', error));
}

function updateChart(historyData) {
    const ctx = document.getElementById('sensor-chart').getContext('2d');
    const labels = historyData.map(entry => entry.timestamp);
    const soilMoistureData = historyData.map(entry => entry.soilMoisture);
    const temperatureData = historyData.map(entry => entry.temperature);
    const humidityData = historyData.map(entry => entry.humidity);
    const lightData = historyData.map(entry => entry.ldr);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Toprak Nemi',
                data: soilMoistureData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Sıcaklık',
                data: temperatureData,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Nem',
                data: humidityData,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Işık Şiddeti',
                data: lightData,
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

function toggleContactForm() {
    const contactForm = document.getElementById("contact");
    contactForm.style.display = contactForm.style.display === "none" ? "block" : "none";
}

function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/contact.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            alert('Mesajınız gönderildi!');
            form.reset();
        } else {
            alert('Mesajınız gönderilemedi, lütfen tekrar deneyin.');
        }
    })
    .catch(error => alert('Mesajınız gönderilemedi, lütfen tekrar deneyin.'));
}
