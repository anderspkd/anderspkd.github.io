(function() {
    let k_iv = Uint8Array.from(atob(window.location.hash.substring(1)), c => c.charCodeAt(0))

    let key = k_iv.slice(0, 32)
    let iv = k_iv.slice(32, 48)

    let ctxt = Uint8Array.from(atob(document.getElementById('c').innerHTML), c => c.charCodeAt(0))

    window.crypto.subtle.importKey(
        "raw",
        key,
        {
            name: "AES-CTR"
        },
        false,
        ["decrypt"]
    ).then(function (k) {
        window.crypto.subtle.decrypt(
            {
                name: "AES-CTR",
                counter: iv,
                length: 128
            },
            k,
            ctxt
        ).then(function(decrypted) {
            let td = new TextDecoder()
            let actual_page_content = td.decode(decrypted)
            document.open()
            document.write(actual_page_content)
            document.close()
        }).catch(function(err){
            console.log(err)
        })
    }).catch(function(err) {
        console.log(err)
    });
})();
