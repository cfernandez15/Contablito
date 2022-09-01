const TABLE_BODY = document.getElementById("table-content");
const ALERT_PATH = document.getElementById("alert-here");

function addRow() {
    let checkboxes_id = document.getElementsByClassName("form-check-input");
    let desc = document.getElementById("desc").value;
    let subtotal = parseInt(document.getElementById("subtotal").value);
    let tipotransaccion = getCheckbox(2, checkboxes_id);
    if (desc !== "" && Number.isInteger(parseInt(subtotal))) {
        ALERT_PATH.innerHTML = "";
        let iva = getIva(getCheckbox(3, checkboxes_id), subtotal);
        let total = getTotal(iva, subtotal);
        let htmlContentToAppend = `
    <tr>
        <td>${desc}</td>
        <td>${tipotransaccion}</td>
        <td>${subtotal}</td>
        <td>${iva}</td>
        <td>${total}</td>
    </tr>
    `
    TABLE_BODY.innerHTML += htmlContentToAppend;
    } else {
        let message;
        if (desc === "" && Number.isInteger(parseInt(subtotal))) {
            message = "La descripcion no puede estar vacia";
            showAlert(message);
        } else if (!Number.isInteger(parseInt(subtotal)) && desc !== "") {
            message = "el subtotal debe ser un numero";
            showAlert(message);
        } else {
            message = "La descripcion no puede estar vacia y el subtotal debe ser un numero";
            showAlert(message);
        }
    }
    
    /*
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    */


}

function getCheckbox(amount,array) {
    if (amount === 2) {
        if (document.getElementById(array[0].id).checked) {
            return document.getElementById(array[0].id).value; 
        } else {
            return document.getElementById(array[1].id).value;
        }
    } else if (amount === 3) {
        if (document.getElementById(array[2].id).checked) {
            return document.getElementById(array[2].id).value;
        } else if (document.getElementById(array[3].id).checked) {
            return document.getElementById(array[3].id).value;
        } else if (document.getElementById(array[4].id).checked) {
            return document.getElementById(array[4].id).value;
        }
    }
}

function showAlert(message) {
    ALERT_PATH.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show text-center" style="max-width: 700px;">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    <strong>Error!</strong> ${message}
  </div>
    `
}

function getTotal(iva, subtotal) {
    let total_final;
    if (iva !== 0) {
        total_final = subtotal + iva;
        return total_final;
    } else {
        return subtotal;
    }
}

function getIva(iva, subtotal) {
    let total_iva;
    parseInt(iva);
    if (iva !== 0) {
        total_iva = Math.round(subtotal * iva/100);
        return total_iva;
    } else {
        return iva;
    }
}