let mapboxToken = ''; // Não usado, mas pronto para expansão

// Mapeamento nome completo -> sigla/região para fallback
const estadosBR = {
    'São Paulo': 'SP - Sudeste', 'Minas Gerais': 'MG - Sudeste', 'Rio de Janeiro': 'RJ - Sudeste', 'Espírito Santo': 'ES - Sudeste',
    'Paraná': 'PR - Sul', 'Rio Grande do Sul': 'RS - Sul', 'Santa Catarina': 'SC - Sul',
    'Mato Grosso do Sul': 'MS - Centro-Oeste', 'Mato Grosso': 'MT - Centro-Oeste', 'Goiás': 'GO - Centro-Oeste', 'Distrito Federal': 'DF - Centro-Oeste',
    'Bahia': 'BA - Nordeste', 'Pernambuco': 'PE - Nordeste', 'Paraíba': 'PB - Nordeste', 'Rio Grande do Norte': 'RN - Nordeste',
    'Ceará': 'CE - Nordeste', 'Piauí': 'PI - Nordeste', 'Maranhão': 'MA - Nordeste', 'Sergipe': 'SE - Nordeste', 'Alagoas': 'AL - Nordeste',
    'Pará': 'PA - Norte', 'Amazonas': 'AM - Norte', 'Roraima': 'RR - Norte', 'Amapá': 'AP - Norte', 'Tocantins': 'TO - Norte',
    'Acre': 'AC - Norte', 'Rondônia': 'RO - Norte'
};

// Mapeamento siglas -> regiões
const regioesSigla = {
    'MG':'Sudeste','SP':'Sudeste','RJ':'Sudeste','ES':'Sudeste','PR':'Sul','RS':'Sul','SC':'Sul',
    'MS':'Centro-Oeste','MT':'Centro-Oeste','GO':'Centro-Oeste','DF':'Centro-Oeste',
    'BA':'Nordeste','PE':'Nordeste','PB':'Nordeste','RN':'Nordeste','CE':'Nordeste','PI':'Nordeste','MA':'Nordeste','SE':'Nordeste','AL':'Nordeste',
    'PA':'Norte','AM':'Norte','RR':'Norte','AP':'Norte','TO':'Norte','AC':'Norte','RO':'Norte'
};

function extrairCidadeEstadoRegiao(display_name) {
    const partes = display_name.split(', ');
    if (partes.length < 2) return display_name;
    
    const cidade = partes[0].trim();
    
    // 1. Tentar sigla direta (2 letras maiúsculas)
    for (let parte of partes) {
        const match = parte.match(/\b([A-Z]{2})\b/);
        if (match && regioesSigla[match[1]]) {
            return `${cidade}, ${match[1]} - ${regioesSigla[match[1]]}`;
        }
    }
    
    // 2. Fallback: nome completo do estado
    for (let nomeEstado in estadosBR) {
        if (display_name.includes(nomeEstado)) {
            return `${cidade}, ${estadosBR[nomeEstado]}`;
        }
    }
    
    return `${cidade} - Região desconhecida`;
}

async function getPrevisao(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=America/Sao_Paulo&forecast_days=7`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro na API do tempo');
        return await res.json();
    } catch (err) {
        throw new Error('Falha na conexão: ' + err.message);
    }
}

function getClimaAtual(code) {
    const climaAtual = {
        0: 'Ensolarado ☀️', 1: 'Poucas nuvens 🌤️', 2: 'Parcialmente nublado ⛅', 3: 'Nublado ☁️',
        45: 'Neblina 🌫️', 48: 'Neblina densa 🌫️', 51: 'Garoa leve 🌦️', 53: 'Garoa 🌦️', 55: 'Garoa forte 🌧️',
        61: 'Chuva leve 🌧️', 63: 'Chuvoso 🌧️', 65: 'Chuva forte ⛈️', 71: 'Neve leve 🌨️', 73: 'Neve moderada 🌨️',
        75: 'Neve forte ❄️', 80: 'Chuvisco leve 🌦️', 81: 'Pancadas de chuva 🌦️', 82: 'Pancadas fortes ⛈️',
        95: 'Tempestade ⚡', 96: 'Tempestade com granizo ⚡⛈️', 99: 'Tempestade forte ⚡⛈️'
    };
    return climaAtual[code] || 'Condições mistas 🌤️';
}

function getIconoWeather(code) {
    const icons = {
        0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
        51: '🌦️', 53: '🌦️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '⛈️',
        71: '🌨️', 73: '🌨️', 75: '❄️', 80: '🌦️', 95: '⛈️'
    };
    return icons[code] || '🌤️';
}

function exibirDados(data, localCompleto, localSimples) {
    const atual = data.current;
    const diarias = data.daily;
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    let html = `
        <div class="atual">
            <h2>${localSimples}</h2>
            <small style="opacity: 0.8; display: block; margin-bottom: 10px;">${localCompleto}</small>
            <div class="temp">${getIconoWeather(atual.weather_code)} ${atual.temperature_2m.toFixed(1)}°C</div>
            <div class="clima-atual">${getClimaAtual(atual.weather_code)}</div>
            <div class="detalhes">
                <div>💧 ${atual.relative_humidity_2m}%</div>
                <div>💨 ${atual.wind_speed_10m.toFixed(0)} km/h</div>
                <div>🌧️ ${atual.precipitation || 0} mm</div>
            </div>
        </div>
        <div class="previsao">`;
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(diarias.time[i]);
        const diaSem = dias[date.getDay()];
        html += `
            <div class="dia">
                <div class="dia-dia">${diaSem}</div>
                <div class="dia-temp">${getIconoWeather(diarias.weather_code[i])}<br>
                    ${diarias.temperature_2m_max[i].toFixed(0)}° / ${diarias.temperature_2m_min[i].toFixed(0)}°
                </div>
                <div class="dia-chuva">🌧️ ${diarias.precipitation_probability_max[i]}%</div>
            </div>`;
    }
    html += '</div>';
    document.getElementById('resultado').innerHTML = html;
}

async function getLocalizacao() {
    document.getElementById('resultado').innerHTML = '<div class="loading">🔄 Localizando...</div>';
    
    if (!navigator.geolocation) return alert('Geolocalização não suportada.');
    
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
            // Reverse geocoding
            const resGeo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
            const place = await resGeo.json();
            
            const localCompleto = place.display_name || 'Localização desconhecida';
            const localSimples = extrairCidadeEstadoRegiao(localCompleto);
            
            const data = await getPrevisao(latitude, longitude);
            exibirDados(data, localCompleto, localSimples);
        } catch (err) {
            document.getElementById('resultado').innerHTML = `<p style="text-align:center; color:#ff6b6b;">❌ Erro: ${err.message}</p>`;
        }
    }, (err) => {
        const msgs = ['Permita localização', 'Posição indisponível', 'Timeout', 'Erro desconhecido'];
        document.getElementById('resultado').innerHTML = `<p style="text-align:center; color:#ff6b6b;">❌ ${msgs[err.code] || msgs[3]}</p>`;
    });
}

async function buscarPorCidade() {
    const cidade = document.getElementById('cidade').value.trim();
    if (!cidade) return alert('Digite uma cidade!');
    
    document.getElementById('resultado').innerHTML = '<div class="loading">🔍 Buscando...</div>';
    
    try {
        const resGeo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(cidade + ', Brazil')}&addressdetails=1`);
        const places = await resGeo.json();
        if (!places[0]) throw new Error('Cidade não encontrada!');
        
        const place = places[0];
        const localCompleto = place.display_name;
        const localSimples = extrairCidadeEstadoRegiao(localCompleto);
        const data = await getPrevisao(place.lat, place.lon);
        exibirDados(data, localCompleto, localSimples);
    } catch (err) {
        document.getElementById('resultado').innerHTML = `<p style="text-align:center; color:#ff6b6b;">❌ ${err.message}</p>`;
    }
}

window.onload = () => {
    if (confirm('Buscar previsão na sua localização?')) getLocalizacao();
};
