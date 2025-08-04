const fetch = require("node-fetch");

let handler = async (m, { conn, args }) => {
  let url = args[0];
  if (!url) throw "Masukkan link CapCut!\nContoh:\n.cc https://www.capcut.com/t/Zs8Uyk7dx/";

  await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

  try {
    let res = await fetch(`https://decode.im-rerezz.xyz/api/dl/capcut?url=${encodeURIComponent(url)}&apikey=${decodekey}`);
    let json = await res.json();

    if (!json.status || !json.data || !json.data.videoUrl) throw "Gagal mengambil data. Periksa link atau coba lagi nanti.";

    let data = json.data;
    let caption = `🎬 *CAPCUT TEMPLATE DOWNLOADER*\n\n📌 Judul: ${data.title}\n👤 Author: ${data.author.name}\n❤️ Likes: ${data.likes}\n📈 Pengguna: ${data.pengguna}\n📅 Tanggal: ${data.date}\n\nMengirim video...`;

    await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
    await conn.sendFile(m.chat, data.videoUrl, "capcut.mp4", "", m);
  } catch (e) {
    console.error(e);
    m.reply("❌ Terjadi kesalahan saat mengunduh template CapCut. Coba lagi nanti.");
  }
};

handler.help = ["cc <link>"];
handler.tags = ["downloader"];
handler.command = /^(cc|ccdl|capcut)$/i;
handler.limit = 3;

module.exports = handler;