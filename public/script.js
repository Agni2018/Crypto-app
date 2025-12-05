function loadEncryptedFiles() {
    fetch("/list")
        .then(res => res.json())
        .then(files => {
            const box = document.getElementById("encrypted-list");
            box.innerHTML = "";

            files.forEach(file => {
                box.innerHTML += `
                <div class="file-item">
                    <span>${file}</span>
                    <a href="/download-encrypted/${file}" class="btn small">Download</a>
                    <a href="/decrypt/${file}" class="btn decrypt small">Decrypt</a>
                </div>
                `;
            });
        });
}

document.getElementById("encrypt-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", document.getElementById("fileInput").files[0]);

    fetch("/encrypt", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => {
            document.getElementById("enc-status").innerText = "File Encrypted Successfully ✔";
            loadEncryptedFiles();
        });
});

loadEncryptedFiles();
