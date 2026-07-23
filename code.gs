const sheetName = 'Sheet1'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

/**
  Mendapatkan atau membuat folder penyimpanan file pendaftaran di Google Drive
 */
function getOrCreateTargetFolder() {
  const folderId = scriptProp.getProperty('FOLDER_ID');
  if (folderId) {
    try {
      return DriveApp.getFolderById(folderId);
    } catch (e) {
      // Fallback jika folder ID tidak valid
    }
  }

  const folderName = 'EIM Recruitment Uploads';
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

/**
  Menyimpan file base64 ke Google Drive dan mengembalikan URL publiknya
 */
function saveFileToDrive(fileData, targetFolder, prefix, nim) {
  if (!fileData || typeof fileData !== 'object' || !fileData.base64) {
    return typeof fileData === 'string' ? fileData : '';
  }

  try {
    const base64Clean = fileData.base64.replace(/^data:.*?;base64,/, '');
    const decodedBytes = Utilities.base64Decode(base64Clean);
    const fileName = `${prefix}_${nim}_${fileData.fileName || 'file'}`;
    const blob = Utilities.newBlob(decodedBytes, fileData.mimeType || 'application/octet-stream', fileName);
    
    const file = targetFolder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    Logger.log('Error saving file: ' + err.toString());
    return '';
  }
}

/**
  Mengirim email konfirmasi pendaftaran kepada pendaftar (Applicant)
 */
function sendConfirmationEmail(data) {
  if (!data.Email) return;

  const subject = `[EIM Research Lab] Confirmation of Recruitment Registration - ${data['Nama Lengkap']}`;
  
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0f19; color: #e2e8f0; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; text-align: center; border-bottom: 2px solid #06b6d4;">
        <h1 style="color: #06b6d4; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">EIM Research Lab</h1>
        <p style="color: #94a3b8; margin-top: 8px; font-size: 14px;">Assistant Recruitment Confirmation</p>
      </div>

      <div style="padding: 30px;">
        <h2 style="color: #f8fafc; font-size: 18px; margin-top: 0;">Halo, ${data['Nama Lengkap']}!</h2>
        <p style="color: #cbd5e1; line-height: 1.6;">Terima kasih telah mendaftar sebagai calon asisten di <strong>EIM Research Lab</strong>. Berkas dan data pendaftaran Anda telah berhasil kami terima.</p>
        
        <div style="background-color: #1e293b; border-left: 4px solid #06b6d4; padding: 20px; border-radius: 6px; margin: 25px 0;">
          <h3 style="color: #06b6d4; margin-top: 0; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Ringkasan Pendaftaran</h3>
          <table style="width: 100%; color: #cbd5e1; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; width: 40%; color: #94a3b8;">Nama Lengkap</td><td style="padding: 6px 0; font-weight: 600;">: ${data['Nama Lengkap']}</td></tr>
            <tr><td style="padding: 6px 0; color: #94a3b8;">NIM</td><td style="padding: 6px 0; font-weight: 600;">: ${data['NIM']}</td></tr>
            <tr><td style="padding: 6px 0; color: #94a3b8;">Angkatan</td><td style="padding: 6px 0; font-weight: 600;">: ${data['Angkatan']}</td></tr>
            <tr><td style="padding: 6px 0; color: #94a3b8;">Pilihan Divisi 1</td><td style="padding: 6px 0; font-weight: 600;">: ${data['Divisi 1']}</td></tr>
            <tr><td style="padding: 6px 0; color: #94a3b8;">Pilihan Divisi 2</td><td style="padding: 6px 0; font-weight: 600;">: ${data['Divisi 2']}</td></tr>
            ${data['Portofolio MedHum'] ? `<tr><td style="padding: 6px 0; color: #94a3b8;">Portofolio MedHum</td><td style="padding: 6px 0;"><a href="${data['Portofolio MedHum']}" style="color: #38bdf8;">Lihat Portofolio</a></td></tr>` : ''}
            <tr><td style="padding: 6px 0; color: #94a3b8;">Bersedia Dipindah</td><td style="padding: 6px 0; font-weight: 600;">: ${data['Bersedia Dipindah Divisi']}</td></tr>
          </table>
        </div>

        <p style="color: #cbd5e1; line-height: 1.6;">Tahapan seleksi berikutnya akan diinformasikan lebih lanjut melalui email dan WhatsApp resmi EIM Research Lab.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">EIM Research Lab &copy; ${new Date().getFullYear()} — Enterprise & Infrastructure Management</p>
        </div>
      </div>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: data.Email,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log('Error sending email: ' + err.toString());
  }
}

function doPost (e) {
  const lock = LockService.getScriptLock()
  // Menunggu hingga 10 detik jika ada akses konkuren dari beberapa user sekaligus
  lock.tryLock(10000)

  try {
    let doc;
    const key = scriptProp.getProperty('key');
    if (key) {
      doc = SpreadsheetApp.openById(key);
    } else {
      doc = SpreadsheetApp.getActiveSpreadsheet();
    }
    
    let sheet = doc.getSheetByName(sheetName)
    if (!sheet) {
      sheet = doc.insertSheet(sheetName)
    }

    // Header resmi 17 kolom sesuai spesifikasi
    const expectedHeaders = [
      'Nama Lengkap',
      'NIM',
      'Angkatan',
      'Email',
      'Nomor Telepon',
      'Divisi 1',
      'Alasan Divisi 1',
      'Divisi 2',
      'Alasan Divisi 2',
      'Portofolio MedHum',
      'Bersedia Dipindah Divisi',
      'Link KSM',
      'Link KHS',
      'Link ML',
      'Link CV',
      'Link PI (Pakta Integritas)',
      'Timestamp'
    ];

    // Ambil header yang sudah ada
    let headers = []
    if (sheet.getLastColumn() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    }

    // Jika sheet masih kosong atau kurang lengkap, set header expected Headers
    if (headers.length === 0 || (headers.length === 1 && headers[0] === "")) {
      headers = expectedHeaders;
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#e0f7fa");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    const nextRow = sheet.getLastRow() + 1;

    // Parser data pendaftaran
    const rawData = {};
    if (e.parameter) {
      for (const k in e.parameter) {
        rawData[k] = e.parameter[k];
      }
    }
    if (e.postData && e.postData.contents) {
      try {
        const json = JSON.parse(e.postData.contents);
        for (const k in json) {
          rawData[k] = json[k];
        }
      } catch (err) {
        // Abaikan jika bukan format JSON
      }
    }

    // Normalisasi kunci pencocokan
    const dataData = {
      'Nama Lengkap': rawData['Nama Lengkap'] || rawData['nama_lengkap'] || '',
      'NIM': rawData['NIM'] || rawData['nim'] || '',
      'Angkatan': rawData['Angkatan'] || rawData['angkatan'] || '',
      'Email': rawData['Email'] || rawData['email'] || '',
      'Nomor Telepon': rawData['Nomor Telepon'] || rawData['nomor_telp'] || '',
      'Divisi 1': rawData['Divisi 1'] || rawData['divisi_1'] || '',
      'Alasan Divisi 1': rawData['Alasan Divisi 1'] || rawData['alasan_divisi_1'] || rawData['Alasan'] || '',
      'Divisi 2': rawData['Divisi 2'] || rawData['divisi_2'] || '',
      'Alasan Divisi 2': rawData['Alasan Divisi 2'] || rawData['alasan_divisi_2'] || rawData['Alasan'] || '',
      'Portofolio MedHum': rawData['Portofolio MedHum'] || rawData['portofolio_medhum'] || '',
      'Bersedia Dipindah Divisi': rawData['Bersedia Dipindah Divisi'] || rawData['bersedia_dipindah'] || '',
      'Link KSM': '',
      'Link KHS': '',
      'Link ML': '',
      'Link CV': '',
      'Link PI (Pakta Integritas)': '',
      'Timestamp': new Date()
    };

    // Proses upload berkas ke Google Drive jika tersedia payload berkas
    const targetFolder = getOrCreateTargetFolder();
    const nim = dataData['NIM'] || 'pendaftar';

    if (rawData.ksm || rawData.file_ksm) {
      dataData['Link KSM'] = saveFileToDrive(rawData.ksm || rawData.file_ksm, targetFolder, 'KSM', nim);
    } else if (rawData['Link KSM']) {
      dataData['Link KSM'] = rawData['Link KSM'];
    }

    if (rawData.khs || rawData.file_khs) {
      dataData['Link KHS'] = saveFileToDrive(rawData.khs || rawData.file_khs, targetFolder, 'KHS', nim);
    } else if (rawData['Link KHS']) {
      dataData['Link KHS'] = rawData['Link KHS'];
    }

    if (rawData.ml || rawData.file_ml) {
      dataData['Link ML'] = saveFileToDrive(rawData.ml || rawData.file_ml, targetFolder, 'ML', nim);
    } else if (rawData['Link ML']) {
      dataData['Link ML'] = rawData['Link ML'];
    }

    if (rawData.cv || rawData.file_cv) {
      dataData['Link CV'] = saveFileToDrive(rawData.cv || rawData.file_cv, targetFolder, 'CV', nim);
    } else if (rawData['Link CV']) {
      dataData['Link CV'] = rawData['Link CV'];
    }

    if (rawData.pi || rawData.file_pi) {
      dataData['Link PI (Pakta Integritas)'] = saveFileToDrive(rawData.pi || rawData.file_pi, targetFolder, 'PI', nim);
    } else if (rawData['Link PI (Pakta Integritas)']) {
      dataData['Link PI (Pakta Integritas)'] = rawData['Link PI (Pakta Integritas)'];
    }

    // Petakan baris baru berdasarkan susunan header di sheet
    const newRow = headers.map(function(header) {
      if (header === 'Timestamp') {
        return dataData['Timestamp'];
      }
      return dataData[header] !== undefined ? dataData[header] : (rawData[header] || '');
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // Auto-resize kolom
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }

    // Kirim email konfirmasi secara asinkron (try-catch didalamnya)
    sendConfirmationEmail(dataData);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}