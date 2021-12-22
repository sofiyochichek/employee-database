$('#save_employee').click(function(){
    console.log('Сохраняем сотрудника');
    saveEmployee();
});
$('#save_company').click(function(){
    console.log('Сохраняем компанию');
    saveCompany();
});


function renderEditEmployee(){
    $('.edit_employee_button').click(function(e){
        var el = e.target;
        var id = el.getAttribute('data-id')
        getEmployee(id);
        console.log('Открываем редактирование: '+id)
    });
}
function renderEditCompany(){
    $('.edit_company_button').click(function(e){
        var el = e.target;
        var id = el.getAttribute('data-id')
        getCompany(id);
        console.log('Открываем редактирование: '+id)
    });
}
function renderDeleteEmployee(){
    $('.delete_employee_button').click(function(e){
        var el = e.target;
        var id = el.getAttribute('data-id')
        deleteEmployee(id);
        console.log('Удаляем: '+id)
    });
}
function renderDeleteCompany(){
    $('.delete_company_button').click(function(e){
        var el = e.target;
        var id = el.getAttribute('data-id')
        deleteCompany(id);
        console.log('Удаляем: '+id)
    });
}

function addEmployee(){
    $('#add_employee').click(function(){
        console.log('Добавляем сотрудника')
        var d = {
            'id' : 0,
            'f' : '',
            'i' : '',
            'phone' : '',
            'email' : '',
            'c-name' : 1,
            'position' : '',
        };
        renderEmployeeForm(d)
    });
}

function addCompany(){
    $('#add_company').click(function(){
        console.log('Добавляем компанию')
        var d = {
            'id' : 0,
            'name' : '',
            'phone' : '',
            's-name' : 1,
        };
        renderCompanyForm(d)
    });
}

// Загружаем данные из бд
function loadEmployeeList(){
    $.ajax({
        url: '/get_employee_list',
        type: 'GET',
        dataType:'json',
        success: function(data){
            console.log(data);
            if(data instanceof Array){
                console.log("Удачная загрузка")
                showEmployeeList(data)
                addEmployee()
            }else{
                console.log("Ошибка при загрузке")
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при загрузке контактов: '+errorMsg);
            // $("#main_alert_success").hide();
            // $('#main-alert_danger').show();
        }
    });
}
function loadSfearList(){
    $.ajax({
        url: '/get_sfear_list',
        type: 'GET',
        dataType:'json',
        success: function(data){
            console.log(data);
            if(data instanceof Array){
                console.log("Удачная загрузка")

                dropSfearList(data)
            }else{
                console.log("Ошибка при загрузке")
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при загрузке контактов: '+errorMsg);
            // $("#main_alert_success").hide();
            // $('#main-alert_danger').show();
        }
    });
}
function loadCompanyList(){
    $.ajax({
        url: '/get_company_list',
        type: 'GET',
        dataType:'json',
        success: function(data){
            console.log(data);
            if(data instanceof Array){
                console.log("Удачная загрузка")
                
                showCompanyList(data)
                dropCompanyList(data)
                // showCompanyListByButton(data)
                addCompany()
            }else{
                console.log("Ошибка при загрузке")
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при загрузке контактов: '+errorMsg);
            // $("#main_alert_success").hide();
            // $('#main-alert_danger').show();
        }
    });
}

// Отображение загруженных данных
function showEmployeeList(data){
    var html='<div class="d-flex"><p><button class="btn btn-primary" id="add_employee">Добавить сотрудника</button></p>';
    html += '<p><a class="btn btn-primary" href="http://db-learning.ithub.ru:1112/create_company">Добавить компанию</a></p></div>'
    html+='<table class="table">';
    // Оформляем каждый елемент в виде таблицы
    data.forEach(function(item, i, data){
        html += '<tr>';
        html += '<td>' +item['f']+'</td>';
        html += '<td>' +item['i']+'</td>';
        html += '<td>' +item['phone']+'</td>';
        html += '<td>' +item['email']+'</td>';
        html += '<td>' +item['c_name']+'</td>';
        html += '<td>' +item['position']+'</td>';
        html += '<td><button class="btn btn-sm btn-success edit_employee_button" data-id="'+item['id']+'">Edit</td>';
        html += '<td><button class="btn btn-sm btn-danger delete_employee_button" data-id="'+item['id']+'">Delete</td>';
        html += '<tr>'
    });
    html += '</table>'

    $('#employee_list').html(html);
    renderEditEmployee();
    renderDeleteEmployee();
}

function showCompanyList(data){
    var html='<div class="d-flex"><p><a class="btn btn-primary" href="http://db-learning.ithub.ru:1112/">Добавить сотрудника</a></p>';
    html += '<p><button class="btn btn-primary" id="add_company" >Добавить компанию</button></p></div>'
    html+='<table class="table">';
    // Оформляем каждый елемент в виде таблицы
    data.forEach(function(item, i, data){
        html += '<tr>';
        html += '<td>' +item['name']+'</td>';
        html += '<td>' +item['phone']+'</td>';
        html += '<td>' +item['s_name']+'</td>';
        html += '<td><button class="btn btn-sm btn-success edit_company_button" data-id="'+item['id']+'">Edit</td>';
        html += '<td><button class="btn btn-sm btn-danger delete_company_button" data-id="'+item['id']+'">Delete</td>';
        html += '<tr>'
    });
    html += '</table>'

    $('#company_list').html(html);
    renderEditCompany();
    renderDeleteCompany();
}

// Вставка загруженных файлов в выпадающий список
function dropSfearList(data){
    var html='<select id="s_name" name="name" required="required">';
    // Оформляем каждый елемент
    data.forEach(function(item, i, data){
        html += '<option value="'+item['id']+'">' +item['name']+'</option>';
    });
    html += '</select>'

    $('#s_name').html(html);
}
function dropCompanyList(data){
    var html='<select id="c_name" name="name" required="required">';
    // Оформляем каждый елемент
    data.forEach(function(item, i, data){
        html += '<option value="'+item['id']+'">' +item['name']+'</option>';
    });
    html += '</select>'

    $('#c_name').html(html);
}

// получаение инфы о одном сотруднике
function getEmployee(id){
    $.ajax({
        url: '/get_employee',
        type: 'POST',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(data) {
            console.log(data);
            if(data.status = 'ok'){
                console.log('Загрузка инфы о сотруднике удачно')
                renderEmployeeForm(data.employee)
            }else{
                console.log('Ошибка при загрузке инфы о сотруднике')
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при взаимодействии с сервером: '+errorMsg);
        }
    });
}
function deleteEmployee(id){
    $.ajax({
        url: '/delete_employee',
        type: 'POST',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(data) {
            console.log(data);
            if(data.status = 'ok'){
                console.log('Удалили инфы о сотруднике удачно')
                loadEmployeeList();
            }else{
                console.log('Ошибка при удалении инфы о сотруднике')
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при взаимодействии с сервером: '+errorMsg);
        }
    });
}
function deleteCompany(id){
    $.ajax({
        url: '/delete_company',
        type: 'POST',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(data) {
            console.log(data);
            if(data.status = 'ok'){
                console.log('Удалили инфы о компании удачно')
                loadCompanyList();
            }else{
                console.log('Ошибка при удалении инфы о компании')
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при взаимодействии с сервером: '+errorMsg);
        }
    });
}


function renderEmployeeForm(data){
    $('#id').val(data['id']),
    $('#f').val(data['f']),
    $('#i').val(data['i']),
    $('#email').val(data['email']),
    $('#phone').val(data['phone']),
    $('#c_name').val(data['c_name']),
    $('#position').val(data['position'])
    $('#c_name').val(data['com_id']).change()

    $('.employee_form').show();
}

function saveEmployee(){
    $.ajax({
        url: '/save_employee',
        type: 'POST',
        dataType: 'json',
        data: {
            id: $('#id').val(),
            f: $('#f').val(),
            i: $('#i').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            c_name: $('#c_name').val(),
            position: $('#position').val()
        },
        success: function(data) {
            console.log(data);
            if(data.status = 'ok'){
                console.log('Сохранили удачно')
                loadEmployeeList()
                $('.employee_form').hide()
            }else{
                console.log('Ошибка при сохранении')
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при взаимодействии с сервером: '+errorMsg);
        }
    });
}

// получаение инфы о одной компании
function getCompany(id){
    $.ajax({
        url: '/get_company',
        type: 'POST',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(data) {
            console.log(data);
            if(data.status = 'ok'){
                console.log('Загрузка инфы о компании удачно')
                renderCompanyForm(data.company)
            }else{
                console.log('Ошибка при загрузке инфы о компании')
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при взаимодействии с сервером: '+errorMsg);
        }
    });
}

function renderCompanyForm(data){
    $('#id').val(data['id']),
    $('#name').val(data['name']),
    $('#phone').val(data['phone']),
    $('#s_name').val(data['s_name']),
    $('#s_name').val(data['sf_id']).change()

    $('.company_form').show();
}

function saveCompany(){
    $.ajax({
        url: '/save_company',
        type: 'POST',
        dataType: 'json',
        data: {
            id: $('#id').val(),
            name: $('#name').val(),
            phone: $('#phone').val(),
            s_name: $('#s_name').val(),
        },
        success: function(data) {
            console.log(data);
            if(data.status = 'ok'){
                console.log('Сохранили удачно')
                loadCompanyList()
                $('.company_form').hide()
            }else{
                console.log('Ошибка при сохранении')
            }
        },
        error: function(jqxhr, status, errorMsg){
            console.log('Ошибка при взаимодействии с сервером: '+errorMsg);
        }
    });
}

// Сразу после загрузки страницы выполняется:
$(function(){
    console.log("Поле загрузки страницы");
    $('#employee_list').text("Загружаю список контактов");
    // $('#create_company').on('click', function() { window.location = 'http://www.google.com'; });z
    loadEmployeeList();
    loadSfearList();
    loadCompanyList();
});