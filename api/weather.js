// Proxy do clima — compatível com iPads antigos (iOS 9)
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  var lat = req.query.lat || '-22.7253';
  var lon = req.query.lon || '-47.6492';

  var url = 'https://api.open-meteo.com/v1/forecast' +
    '?latitude=' + lat +
    '&longitude=' + lon +
    '&current_weather=true' +
    '&hourly=apparent_temperature,relativehumidity_2m' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FSao_Paulo' +
    '&forecast_days=7';

  try {
    var response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({ error: 'open-meteo error: ' + response.status });
    }
    var data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
