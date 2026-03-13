*English*

# 🌤️ Real-Time Weather - Responsive Web App

Modern web app showing **real-time weather forecasts** using **automatic geolocation** or city search. Fluid interface with animated gradients and precise data for all Brazil.

[![Leopoldina MG](https://via.placeholder.com/800x400/74b9ff/ffffff?text=Leopoldina,+MG+-+75°F+Rainy)](https://augustocc23.github.io/previsao-tempo/)

## 🚀 Features

- ✅ **Automatic geolocation** (browser GPS)
- ✅ **City search** (Nominatim autocomplete)
- ✅ **Current + 7-day forecast** (Open-Meteo API)
- ✅ **Brazil regions** (North, Northeast, Southeast, South, Midwest)
- ✅ **Descriptive weather** (Sunny ☀️, Rainy 🌧️, Cloudy ☁️)
- ✅ **Fully responsive** (mobile-first)
- ✅ **Zero configuration** (no API keys)

## 🛠️ Technologies

| Frontend | API | Data | Others |
|----------|-----|------|--------|
| HTML5 | Open-Meteo | Nominatim Geo | CSS3 Animations |
| CSS3 Grid/Flexbox | Geolocation API | WMO Weather Codes | Vanilla JavaScript |
| Animated gradients | OpenStreetMap | BR States/Regions | PWA-ready |

## 📊 APIs Used

### 1. **Open-Meteo** (Weather Forecast)

[https://api.open-meteo.com/v1/forecast](https://api.open-meteo.com/v1/forecast)

- **Free unlimited** (non-commercial)
- Temperature, humidity, wind, precipitation
- Hourly/daily forecast up to 7 days
- 1-11km resolution

### 2. **Nominatim** (Geocoding)

[https://nominatim.openstreetmap.org/](https://nominatim.openstreetmap.org/)

- Direct city search
- Reverse geocoding (lat/lon → address)
- Smart BR states/regions parsing

## 🎨 Visual Structure

Leopoldina, MG - Southeast ← City + Region
75°F ☀️ ← Current temperature
Rainy ← WMO description
💧 89% | 💨 6 mph | 🌧️ 0.1" ← Details
[Wed Thu Fri Sat Sun Mon Tue]← Weekly forecast

_____________________________________________________________________________________________

*Português-BR*

# 🌤️ Previsão do Tempo Real - App Web Responsivo

App web moderna que mostra previsão do tempo **em tempo real** usando **geolocalização automática** ou busca por cidade. Interface fluida com gradientes animados e dados precisos para todo Brasil.

[![Leopoldina MG](https://via.placeholder.com/800x400/74b9ff/ffffff?text=Leopoldina,+MG+-+24.3°C+Chuvoso)](https://augustocc23.github.io/previsao-tempo/)

## 🚀 Funcionalidades

- ✅ **Geolocalização automática** (browser GPS)
- ✅ **Busca por cidade** (autocomplete Nominatim)
- ✅ **Previsão atual + 7 dias** (Open-Meteo API)
- ✅ **Regiões BR** (Norte, Nordeste, Sudeste, Sul, Centro-Oeste)
- ✅ **Clima descritivo** (Ensolarado ☀️, Chuvoso 🌧️, Nublado ☁️)
- ✅ **Totalmente responsiva** (mobile-first)
- ✅ **Zero configuração** (sem API keys)

## 🛠️ Tecnologias

| Frontend | API | Dados | Outros |
|----------|-----|-------|--------|
| HTML5 | Open-Meteo | Nominatim Geo | CSS3 Animations |
| CSS3 Grid/Flexbox | Geolocation API | WMO Weather Codes | Vanilla JavaScript |
| Gradientes animados | OpenStreetMap | Estados/Regiões BR | PWA-ready |

## 📊 APIs Utilizadas

### 1. **Open-Meteo** (Previsão do Tempo)

https://api.open-meteo.com/v1/forecast

text
- **Gratuita ilimitada** (não comercial)
- Temperatura, umidade, vento, precipitação
- Previsão horária/diária até 7 dias
- Resolução 1-11km

### 2. **Nominatim** (Geocoding)

https://nominatim.openstreetmap.org/

text
- Busca direta por cidade
- Reverse geocoding (lat/lon → endereço)
- Parsing inteligente estados/regiões BR

## 🎨 Estrutura Visual

Leopoldina, MG - Sudeste ← Cidade + Região
24.3°C ☀️ ← Temperatura atual
Chuvoso ← Descrição WMO
💧 89% | 💨 6 km/h | 🌧️ 0.1mm ← Detalhes
[Qua Qua Sex Sáb Dom Seg Ter] ← Previsão semanal