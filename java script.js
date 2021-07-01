function createInput() {
    var el = document.getElementById("input_num").value; //input amount
    if (el == '' || el < 0) {
        document.querySelector(".errorMsg").innerHTML = "Enter the amount of input first!";
    } else {
        var n = el && parseInt(el, 10);
        if (isNaN(n)) {
            return;
        }

        var input;
        var parent = document.getElementById("parent");

        cleanDiv(parent);
        for (var i = 0; i < n; i++) {
            input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('class', 'input_box');
            input.setAttribute('placeholder', 'Number ' + (i + 1));
            input.setAttribute('id', i);
            parent.appendChild(input);
        }
        document.querySelector(".errorMsg").innerHTML = '';

    }
    //Hide table, chart
    var x = document.querySelector("#Table");
    x.style.visibility = "hidden";
    var y = document.getElementsByTagName("td");
    for (i = 0; i < y.length; i++) {
        y[i].style.border = "none";
    }
    var z = document.querySelector("#myChart");
    z.style.visibility = "hidden";

}

function getAverage() {
    var input_amount = document.getElementById("input_num").value; //input amount

    if (input_amount > 0) {

        for (var i = 0; i < input_amount; i++) { //Check input box is empty or not
            var val, inpStatus, emptyIndex, element;
            element = document.getElementById(i);
            if (element != null) {
                val = String(element.value);
            } else {
                val = null;
            }
            if (val == '' || val == 'null') {
                inpStatus = "Empty";
                emptyIndex = i + 1;
                i = input_amount; //Break loop
            } else {
                inpStatus = "Active";
            }
        }

        if (inpStatus == 'Active') { //Not input box is empty
            var sum = 0,
                avg, gm, product = 1,
                array = [],
                largest = 0,
                smallest = 0,
                elmt, input_value;
            for (var i = 0; i < input_amount; i++) {
                elmt = document.getElementById(i);
                if (elmt != null) {
                    input_value = Number(elmt.value);
                } else {
                    input_value = 0;
                }
                sum += input_value;
                product = product * input_value;
                array[i] = input_value;
            }
            /*
            for (i=0; i<=largest;i++){
                if (array[i]>largest) {
                    var largest=array[i];
                }
            }
            */
            largest = Math.max(...array);
            smallest = Math.min(...array);
            avg = Number(sum / input_amount);
            gm = Math.pow(product, 1 / input_amount);

            //Visible table,chart
            var x = document.querySelector("#Table");
            x.style.visibility = "visible";
            var y = document.getElementsByTagName("td");
            for (i = 0; i < y.length; i++) {
                y[i].style.border = "1px solid #dddddd";
            }
            var z = document.querySelector("#myChart");
            z.style.visibility = "visible";


            document.querySelector("#outputMax").innerHTML = largest;
            document.querySelector("#outputMin").innerHTML = smallest;
            document.querySelector("#outputSum").innerHTML = sum;
            document.querySelector("#outputAvg").innerHTML = avg.toFixed(2);
            document.querySelector("#outputGm").innerHTML = gm.toFixed(2);
            document.querySelector(".errorMsg").innerHTML = '';

            //Chart
            google.charts.load('current', {
                'packages': ['corechart']
            });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable([
                    ['Item', 'Value'],
                    ['Min', smallest],
                    ['Max', largest],
                    ['Sum', sum],
                    ['Average', avg],
                    ['Geometric mean', gm]
                ]);

                var options = {
                    title: 'Bar Chart'
                };

                var chart = new google.visualization.BarChart(document.getElementById('myChart'));
                chart.draw(data, options);
            }

        } else { //Empty input box found
            document.querySelector(".errorMsg").innerHTML = "Input " + emptyIndex + " is empty! ";
        }


    } else {
        document.querySelector(".errorMsg").innerHTML = "Enter the amount of input for average! ";
    }
}


function cleanDiv(div) {
    div.innerHTML = '';
}