const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const APIKEY = "V-Pedia-" //ambil apikey di https://www.v-pedia.web.id
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/hd', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hd.html'));
});

app.get('/providers', async (req, res) => {
  try {
    const response = await axios.get('https://www.v-pedia.web.id/h2h/providers', {
      params: {
        apikey: APIKEY
      }
    });

    if (response.data.success) {
      res.json({
        success: true,
        data: response.data.data,
        message: response.data.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data dari penyedia.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data.',
      error: error.message
    });
  }
});

app.get('/price-list', async (req, res) => {
  try {
    const { category, provider } = req.query;
    const params = {
      apikey: APIKEY
    };

    if (category) params.category = category;
    if (provider) params.provider = provider;

    const response = await axios.get('https://www.v-pedia.web.id/h2h/price-list', { params });

    if (response.data.success) {
      res.json({
        success: true,
        data: response.data.data,
        message: response.data.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data price-list.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data price-list.',
      error: error.message
    });
  }
});

app.get('/order', async (req, res) => {
  const { code, target } = req.query;

  if (!code || !target) {
    return res.status(400).json({
      success: false,
      message: 'Parameter code dan target wajib diisi'
    });
  }

  try {
    const response = await axios.get('https://www.v-pedia.web.id/h2h/order/create', {
      params: {
        code,
        target,
        apikey: APIKEY
      }
    });

    if (response.data.success) {
      res.json({
        success: true,
        message: response.data.message,
        data: response.data.data
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Gagal membuat transaksi'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat transaksi',
      error: error.message
    });
  }
});

// Cek Status Transaksi
app.get('/order-status', async (req, res) => {
  const { trxid } = req.query;

  if (!trxid) {
    return res.status(400).json({
      success: false,
      message: 'Parameter trxid wajib diisi'
    });
  }

  try {
    const response = await axios.get('https://www.v-pedia.web.id/h2h/order/check', {
      params: {
        trxid,
        apikey: process.env.APIKEY
      }
    });

    if (response.data.success) {
      res.json({
        success: true,
        message: response.data.message,
        data: response.data.data
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Gagal cek status transaksi'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat cek status',
      error: error.message
    });
  }
});


app.get('/deposit', async (req, res) => {
  const { nominal } = req.query;

  if (!nominal) {
    return res.status(400).json({
      success: false,
      message: 'Parameter nominal wajib diisi'
    });
  }

  try {
    const response = await axios.get('https://www.v-pedia.web.id/h2h/deposit/create', {
      params: {
        nominal,
        apikey: APIKEY
      }
    });

    if (response.data.success) {
      res.json({
        success: true,
        message: response.data.message,
        data: response.data.data
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Gagal membuat permintaan deposit'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat deposit',
      error: error.message
    });
  }
});

app.get('/deposit-status', async (req, res) => {
  const { trxid } = req.query;

  if (!trxid) {
    return res.status(400).json({
      success: false,
      message: 'Parameter trxid wajib diisi'
    });
  }

  try {
    const response = await axios.get('https://www.v-pedia.web.id/h2h/deposit/status', {
      params: {
        trxid,
        apikey: APIKEY
      }
    });

    if (response.data.success) {
      res.json({
        success: true,
        message: response.data.message,
        data: response.data.data
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Gagal cek status deposit'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat cek status deposit',
      error: error.message
    });
  }
});

app.get('/deposit-cancel', async (req, res) => {
  const { trxid } = req.query;

  if (!trxid) {
    return res.status(400).json({
      success: false,
      message: 'Parameter trxid wajib diisi'
    });
  }

  try {
    const response = await axios.get('https://www.v-pedia.web.id/h2h/deposit/cancel', {
      params: {
        trxid,
        apikey: APIKEY 
      }
    });

    if (response.data.success) {
      res.json({
        success: true,
        message: response.data.message,
        data: response.data.data
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Gagal membatalkan deposit'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membatalkan deposit',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
