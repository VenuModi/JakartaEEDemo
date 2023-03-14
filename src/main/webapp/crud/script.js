const baseUrl = 'http://localhost:8080/api/foods';

var crudApp = new function () {

    // An array of JSON objects with values.
    this.myData = []

    this.category = ['Fruits', 'Vegetables', 'Grains', 'Protein', 'Dairy'];

    this.headers = ["id", "name", "category", "price"];


    this.createTable = async function () {

        this.myData = await fetchAllJSON();

        // CREATE A TABLE.
        var table = document.createElement('table');
        table.setAttribute('id', 'dataTable');

        var tr = table.insertRow(-1);               // Create a row (for header).

        for (var header of this.headers) {
            var th = document.createElement('th');
            th.innerHTML = header.replace('_', ' ');
            tr.appendChild(th);
        }

        // Add rows using JSON data.
        for (var i = 0; i < this.myData.length; i++) {
            tr = table.insertRow(-1);           // Create a new row.
            for (var j = 0; j < this.headers.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.myData[i][this.headers[j]];
            }

            // Dynamically create and add elements to table cells with events.

            this.td = document.createElement('td');

            // *** CANCEL OPTION.
            tr.appendChild(this.td);
            var btCancel = document.createElement('input');

            btCancel.setAttribute('type', 'button');      // SET ATTRIBUTES.
            btCancel.setAttribute('value', 'Cancel');
            btCancel.setAttribute('id', 'Cancel' + i);
            btCancel.setAttribute('style', 'display:none;');
            btCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
            this.td.appendChild(btCancel);

            // *** SAVE.
            tr.appendChild(this.td);
            var btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudApp.Save(this)');
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudApp.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btUpdate);

            // *** DELETE.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);
        }

        // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).

        tr = table.insertRow(-1);           // CREATE THE LAST ROW.

        for (var j = 0; j < this.headers.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {

                if (j === 2) {   // WE'LL ADD A DROPDOWN LIST AT THE SECOND COLUMN (FOR Category).

                    var select = document.createElement('select');      // CREATE AND ADD A DROPDOWN LIST.
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.category.length; k++) {
                        select.innerHTML = select.innerHTML + '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                    }
                    newCell.appendChild(select);
                } else {
                    var tBox = document.createElement('input');          // CREATE AND ADD A TEXTBOX.
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
        btNew.setAttribute('value', 'Create');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
        this.td.appendChild(btNew);

        var div = document.getElementById('container');
        div.innerHTML = '';
        div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
    };

    // CANCEL.
    this.Cancel = function (oButton) {

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        // HIDE THE SAVE BUTTON.
        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // SHOW THE UPDATE BUTTON AGAIN.
        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        var tab = document.getElementById('dataTable').rows[activeRow];

        for (i = 0; i < this.headers.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.myData[(activeRow - 1)][this.headers[i]];
        }
    }

    // EDIT DATA.
    this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('dataTable').rows[activeRow];

        // SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
        for (i = 1; i < 4; i++) {
            if (i == 2) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');      // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.category.length; k++) {
                    ele.innerHTML = ele.innerHTML + '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            } else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');      // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var btCancel = document.getElementById('Cancel' + (activeRow - 1));
        btCancel.setAttribute('style', 'display:inline; float:left; margin-left:10px; background-color:#808080;');

        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:inline; float:left; margin-left:10px; background-color:#2DBF64;');

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none;');
    };


    // DELETE DATA.
    this.Delete = async function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var id = this.myData[activeRow - 1]["id"];
        await deleteID(id);
        await this.createTable();
    }

    // SAVE DATA.
    this.Save = async function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('dataTable').rows[activeRow];

        // UPDATE myData ARRAY WITH VALUES.
        for (i = 1; i < this.headers.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                this.myData[(activeRow - 1)][this.headers[i]] = td.childNodes[0].value;
            }
        }
        await updateByID(this.myData[(activeRow - 1)]['id'], this.myData[(activeRow - 1)]);
        await this.createTable();     // REFRESH THE TABLE.
    }

    // CREATE NEW.
    this.CreateNew = async function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('dataTable').rows[activeRow];
        var obj = {};

        for (i = 1; i < this.headers.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') === 'text' || td.childNodes[0].tagName === 'SELECT') {
                var txtVal = td.childNodes[0].value;
                if (txtVal !== '') {
                    obj[this.headers[i]] = txtVal.trim();
                } else {
                    obj = '';
                    alert('all fields are compulsory');
                    break;
                }
            }
        }
        if (Object.keys(obj).length > 0) {
            console.log(obj)
            await addNew(obj);
            await this.createTable();
        }
    }

    //Rest API calls
    function fetchAllJSON() {
        return fetch(baseUrl).then(response => response.json());
    }

    function deleteID(id) {
        return fetch(baseUrl + '/' + id, {method: 'DELETE'}).then(response => response.status);
    }

    function updateByID(id, obj) {
        const headers = new Headers({
            "Content-Type": "application/json"
        });
        const opts = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(obj),
        };
        return fetch(baseUrl + '/' + id, opts).then(response => response.status);
    }

    function addNew(obj) {
        const headers = new Headers({
            "Content-Type": "application/json"
        });
        const opts = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(obj),
        };
        return fetch(baseUrl, opts).then(resposne => resposne.status);
    }
}

crudApp.createTable();
