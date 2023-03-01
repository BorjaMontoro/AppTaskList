/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
let generalEditElem;
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    let datos=[];
    refresh();
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}
function addElem() {
    let texto=window.prompt("Que tarea quieres añadir?");
    if (texto.trim()!=""){
        datos.push(texto);
        localStorage.setItem("datos",JSON.stringify(datos));
        refresh();
        
    }

}
function refresh(){
    datos=JSON.parse(localStorage.getItem("datos"));
    $('ul').empty();
    for (let i=0;i<datos.length;i++){
        let elem = $(`<li>
                        <div class="contenedor">
                            <label class="nombre">${datos[i]}</label>
                            <button class="eliminar">Eliminar</button>
                            <a href="#editPage">
                                <button class="editar">Editar</button>
                            </a>
                        </div>
                    </li>`);
        $(".eliminar",elem).click((e) => {
            datos=JSON.parse(localStorage.getItem("datos"));
            let indice=datos.indexOf($(e.target).parent().find("label").text());
            datos.splice(indice,1);
            localStorage.setItem("datos",JSON.stringify(datos));
            refresh();
            return false;
        });
        $(".editar",elem).click((e) => {
            generalEditElem=$(e.target).parent().parent().parent();
            $("#nuevoNombre").val(generalEditElem.children().find("label").text());
        });
        $('ul').append(elem);
    }
    $('ul').listview("refresh");
}

$('#boto1').click(addElem);
$("#modificar").click(function() {
            let nuevoNombre = $("#nuevoNombre").val();
            datos=JSON.parse(localStorage.getItem("datos"));
            let indice=datos.indexOf(generalEditElem.children().find("label").text());
            datos.splice(indice,1,nuevoNombre);
            localStorage.setItem("datos",JSON.stringify(datos));
            refresh();
            window.location = "#";
        });

