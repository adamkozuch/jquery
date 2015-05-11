(function ($) {

    $.fn.walidacja = function (options, action) {

        return this.each(function () {
            var settings = $.extend({
                text: "Podaj wartośćiiiiiiiiiii",
                pattern: /e/,
                code:"0"
            }, options);

            var defaultText = settings.topic;
            var regPatt = settings.pattern;
            $(this).val(defaultText);


            if (action === "email") {
                zmienna = $(this).val();
                $(this).on("keyup", (function () {
                    if ($(this).val().match(/@/).length === 1) {
                        $('#emailLabel').append("Walidacja po regex udana");
                    }
                    else
                        $('#emailLabel').append("Walidacja po regex nie udana");
                }));


            }

            if (action === "regex") {
                $(this).on("keyup", (function () {
                    if ($(this).val().match(regPatt).length >= 0)
                        $('#regexLabel').text("Walidacja po regex udana");
                    else
                        $('#regexLabel').text("Walidacja po regex nie udana");
                }));
            }


            if (action === "passwordComplexity") {
                $(this).on("keyup", (function () {
                    var stringLength = $(this).val().length;
                    var upperCase = countUpperCaseChars($(this).val()) / stringLength;
                    var lowerCase = countLowerCaseChars($(this).val()) / stringLength;
                    //var numers = countNumbers($(this).val())/stringLength;

                    var l;
                    var multi;
                    if (upperCase > lowerCase) {
                        l = upperCase - lowerCase;
                    } else {
                        l = lowerCase - upperCase;
                    }
                    if (l < 0.1) {
                        multi = 5;
                    } else if (l > 0.1 && l < 0.3) {
                        multi = 3;
                    } else {
                        multi = 1;
                    }


                    var complexity = multi * stringLength;
                    if (complexity < 10)
                        $('#zlozonoscLabel').text("Haslo slabe");
                    else if (complexity > 10 && complexity < 50)
                        $('#zlozonoscLabel').text("Haslo srednie");
                    else if (complexity > 50)
                        $('#zlozonoscLabel').text("Haslo mocne");
                }));
            }


            if (action === "passwordEnthropy") {

                $(this).on("keyup", (function () {
                    //tutaj będzie log2n dla każdego znaku  tylko ile jest możliwych znaków 255 aci characters
                    var singleCharacterEnthropy = Math.log(255);
                    var lengthOfString = $(this).val().length;
                    var enthropy = singleCharacterEnthropy * lengthOfString;

                    $('#entropiaLabel').text("Entropia to " + enthropy);
                }));
            }


            if (action === "postCode") {
                $(this).on("blur", (function () {
                    c =  $(this).val().toString();

                        var data = [];
                        $.ajax({
                            url: "http://localhost:63343/jqdemo/WebContent/kody.csv",
                            async: false,
                            success: function (csvd) {


                                city = returnCity(c, csvd);


                            },
                            dataType: "text",
                            complete: function () {
                                $('#kodLabel').text(city);
                            }
                        });




              //      dataStr.forEach(ShowResults);


                }
                ))
            }

            function ShowResults(value, index, ar) {
                document.write("value: " + value);
                document.write(" index: " + index);
                document.write("<br />");
            }

            function returnCity(cityCode,csvd ){
                var lines=  csvd.split("\n");

                for(var i = 0;i < lines.length;i++){
                    var list =  lines[i].split(";");
                    var kod = list[0];
                    var city = list[2];
                    if(kod===cityCode)
                    {
                        return  city;
                    }
                }
                return "miasta nie ma w bazie";
            }


        })}})(jQuery);

function countUpperCaseChars(str) {
    var count=0,len=str.length;
    for(var i=0;i<len;i++) {
        if(/[A-Z]/.test(str.charAt(i))) count++;
    }
    return count;
}

function countLowerCaseChars(str) {
    var count=0,len=str.length;
    for(var i=0;i<len;i++) {
        if(/[a-z]/.test(str.charAt(i))) count++;
    }
    return count;
}
function countNumbers(str) {
    var count=0,len=str.length;
    for(var i=0;i<len;i++) {
        if(/[0-9]/.test(str.charAt(i))) count++;
    }
    return count;
}
