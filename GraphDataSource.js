function GraphDataSource(){
    
    // section network data
    this.secNodeList = undefined;
    this.secYishengList = undefined;
    this.secInchaiList = undefined;
    // cg network data
    this.cgNodeList = [
        { id: '3-n-11', label: '3-n-11\n認識分數、同分母比較/加減', name: '3-n-11\n認識分數、同分母比較/加減', cg: '3-n-11' },
        { id: '4-n-07', label: '4-n-07\n整數相除的意涵', name: '4-n-07\n整數相除的意涵', cg: '4-n-07' },
        { id: '4-n-08', label: '4-n-08\n真分數、假分數與帶分數', name: '4-n-08\n真分數、假分數與帶分數', cg: '4-n-08' },
        { id: '4-n-09', label: '4-n-09\n等值分數、異分母分數比較', name: '4-n-09\n等值分數、異分母分數比較', cg: '4-n-09' },
        { id: '4-n-10', label: '4-n-10\n分數標記在數線', name: '4-n-10\n分數標記在數線', cg: '4-n-10' },
        { id: '5-n-06', label: '5-n-06\n約分、擴分、等值分數', name: '5-n-06\n約分、擴分、等值分數', cg: '5-n-06' },
        { id: '5-n-07', label: '5-n-07\n通分、異分母分數比較/加減', name: '5-n-07\n通分、異分母分數比較/加減', cg: '5-n-07' },
        { id: '5-n-08', label: '5-n-08\n分數乘法', name: '5-n-08\n分數乘法', cg: '5-n-08' },
        { id: '5-n-09', label: '5-n-09\n除數為整數的分數除法', name: '5-n-09\n除數為整數的分數除法', cg: '5-n-09' },
        { id: '5-n-13', label: '5-n-13\n分數、小數標記在數線', name: '5-n-13\n分數、小數標記在數線', cg: '5-n-13' },
        { id: '6-n-03', label: '6-n-03\n將分數約成最簡分數', name: '6-n-03\n將分數約成最簡分數', cg: '6-n-03' },
        { id: '6-n-04', label: '6-n-04\n分數除法', name: '6-n-04\n分數除法', cg: '6-n-04' },
        { id: '6-n-05', label: '6-n-05\n分數的兩步驟問題', name: '6-n-05\n分數的兩步驟問題', cg: '6-n-05' },
        { id: '6-n-09', label: '6-n-09\n認識比和比值', name: '6-n-09\n認識比和比值', cg: '6-n-09' },
        { id: '6-n-10', label: '6-n-10\n理解正比的意義', name: '6-n-10\n理解正比的意義', cg: '6-n-10' },
    ];
    // yisheng
    this.cgYishengList = [
        { from: "3-n-11", to: "4-n-08" },
        { from: "4-n-08", to: "4-n-09" },
        { from: "4-n-09", to: "5-n-06" },
        { from: "5-n-04", to: "5-n-06" },
        { from: "5-n-06", to: "5-n-07" },
        { from: "5-n-04", to: "5-n-07" },
        { from: "5-n-05", to: "5-n-07" },
        { from: "5-n-06", to: "5-n-08" },
        { from: "5-n-08", to: "5-n-09" },
        { from: "4-n-10", to: "5-n-13" },
        { from: "5-n-06", to: "6-n-03" },
        { from: "6-n-02", to: "6-n-03" },
        { from: "5-n-09", to: "6-n-04" },
        { from: "5-n-06", to: "6-n-09" },
        { from: "5-n-14", to: "6-n-09" },
        { from: "6-n-09", to: "6-n-10" },
        { from: "3-n-11", to: "4-n-07" },
        { from: "4-n-07", to: "6-n-09" },
        { from: "4-n-08", to: "4-n-10" }
    ];
    this.cgYishengList = GraphUtil.updateEdgesWeight(this.cgYishengList);

    // inChai
    this.cgInchaiList = [
        { from: '3-n-11', to: '4-n-07' },
        { from: '3-n-11', to: '4-n-09' },
        { from: '3-n-11', to: '4-n-08' },
        { from: '4-n-08', to: '4-n-10' },
        { from: '4-n-09', to: '5-n-06' },
        { from: '5-n-06', to: '5-n-07' },
        { from: '4-n-08', to: '5-n-07' },
        { from: '4-n-08', to: '5-n-08' },
        { from: '4-n-08', to: '5-n-09' },
        { from: '4-n-10', to: '5-n-13' },
        { from: '6-n-09', to: '6-n-10' }
    ];
    this.cgInchaiList = GraphUtil.updateEdgesWeight(this.cgInchaiList);
    
    // current use data
    this.curRelation = undefined;
    this.curNodeList = undefined;
    this.curEdgeList = undefined;
    this.curDate = 'all';
    this.curEmail = undefined;

    // data
    this.liveExercise = undefined;
    this.resultData = {};

    // cg and exercise relation
    this.cgToExercise = {
        "3-n-11": ["menfs3ce"],
        "4-n-07": [],
        "4-n-08": ["menfs4cf", "menfs4cd"],
        "4-n-09": [],
        "4-n-10": [],
        "5-n-06": ["menfs4ae"],
        "5-n-07": ["menfs5ba"],
        "5-n-08": ["m3afs-cd"],
        "5-n-09": ["m3afs-ch"],
        "5-n-13": ["mencs5ci"],
        "6-n-03": ["menzs6af", "menzs6aj"],
        "6-n-04": ["menfs6ak"],
        "6-n-05": ["menfs6ag"],
        "6-n-09": ["menfs6bc"],
        "6-n-10": ["m3abs-ca"],
    };
}
// Graph element
GraphDataSource.prototype.initialGraphElement = function() {
    var self = this;
    var f1 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/c5ib14yaw6hmh2k/shujun_fraction_in_line_v2.csv",
        dataType: "text",
        success: function (data) {
            relationList = self.processData(data);
            graphElement = self.createGraphElement(relationList);
            secNodeList = graphElement[0];
            secYishengList = graphElement[1];
        }
    });
    var f2 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/o9m8rjgo4uroara/inchai_fraction_in_line.csv",
        dataType: "text",
        success: function (data) {
            relationList = self.processData(data);
            graphElement = self.createGraphElement(relationList);
            secInchaiList = graphElement[1];
        }
    });
    var f3 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/gce26byflmuq7ch/live_exercise.csv",
        dataType: "text",
        success: function (data) {
            liveExercise = self.processData(data);
        }
    });
    var f4 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/j9tcnyrr8b2t16b/pintong_remedial_result.txt",
        dataType: "text",
        success: function (data) {
            self.loadRemedialJson(data);
        }
    });
    var f5 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/snfffgshh19hen3/pintong_junyi_result.txt",
        dataType: "text",
        success: function (data) {
            self.loadJunyiJson(data);
        }
    });
    w = $.when(f1, f2, f3, f4, f5);
    w.done(function () {
        curNodeList = jQuery.extend(true, [], secNodeList);
        ;
        curEdgeList = jQuery.extend(true, [], secYishengList);
        curNodeList = GraphUtil.setLevel(curNodeList, curEdgeList);
        curRelation = "宜陞";
        //initial_graph();
        $("#dropdownNetworkButton").removeAttr("disabled");
        $("#editModeBtn").removeAttr("disabled");
    });
}
GraphDataSource.prototype.processData = function(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var tarr = {};
            for (var j = 0; j < headers.length; j++) {
                tarr[headers[j]] = data[j];
            }
            lines.push(tarr);
        }
    }
    return lines;
}
GraphDataSource.prototype.createGraphElement = function(relation_list) {
    section_id_list = [];
    section_list = [];
    section_edge_list = [];
    for (var i = 0; i < relation_list.length; i++) {
        relation = relation_list[i];
        prev_chapter = relation['prev_chapter'];
        prev_section = relation['prev_section'];
        prev_cg = relation['prev_cg'];
        prev_section_name = prev_chapter + '_' + prev_section;
        section = {
            id: prev_section_name,
            label: prev_cg + '\n' + prev_section_name,
            name: prev_cg + '\n' + prev_section_name,
            cg: prev_cg,
        };
        if (section_id_list.indexOf(prev_section_name) === -1) {
            section_list.push(section);
            section_id_list.push(prev_section_name);
        }
        next_chapter = relation['next_chapter'];
        next_section = relation['next_section'];
        next_cg = relation['next_cg'];
        next_section_name = next_chapter + '_' + next_section;
        section = {
            id: next_section_name,
            label: prev_cg + '\n' + next_section_name,
            name: prev_cg + '\n' + next_section_name,
            cg: prev_cg,
        };
        if (section_id_list.indexOf(next_section_name) === -1) {
            section_list.push(section);
            section_id_list.push(next_section_name);
        }
        section_edge_list.push({
            from: prev_section_name,
            to: next_section_name,
        });
    }
    return [section_list, section_edge_list];
}
GraphDataSource.prototype.resetData = function() {
    this.resultData = {};
}
GraphDataSource.prototype.collectData = function(data, type){
    for(var email in data){
        if( !(email in this.resultData) ){
            this.resultData[email] = [];
        }
        var resultDict = data[email];
        for( var key in resultDict ){
            var result = resultDict[key];
            if( !Array.isArray(result) ){
                // result is an object {}
                var resultObj = {
                    "name": key,
                    "date": (!result['date'] || result['date'] === 'NA' || result['date'] === 'nan') ? undefined : result['date'],
                    "type": type,
                    "status": result['status'],
                }
                this.resultData[email].push(resultObj);
            } else {
                for(var i=0; i<result.length; i++){
                    var resultObj = {
                        "name": key,
                        "date": (!result[i]['date'] || result[i]['date'] === 'NA' || result[i]['date'] === 'nan') ? undefined : result[i]['date'],
                        "type": type,
                        "status": result[i]['status'],
                    }
                    this.resultData[email].push(resultObj);
                }
            }
        }
    }
}
GraphDataSource.prototype.loadRemedialJson = function(data) {
    if (!data) {
        data = $("#cg_result")[0].value;
    }
    var results_obj = jQuery.parseJSON(data);
    this.collectData(results_obj, "remedial");
    $(".submit_junyi").show();
    //updateStudentDropdown(); > update in view
}
GraphDataSource.prototype.loadJunyiJson = function(data) {
    if (!data) {
        data = $("#junyi_result")[0].value;
    }
    var junyi_obj = jQuery.parseJSON(data);
    this.collectData(junyi_obj, "junyi");
    //updateStudentDropdown();
}    

GraphDataSource.prototype.changeData = function(resource) {
    if (resource === "custom") {
        $("#dropdownDataButton")[0].innerHTML = "自行匯入";
        $("#submitCustomData").show();
        junyi_obj = {};
        results_obj = {};
        $("#dropdownStudentButton").attr("disabled", true);
        $("#dropdownDateButton").attr("disabled", true);
    } else {
        $("#dropdownDataButton")[0].innerHTML = resource === 'pintong' ? "屏東補救教學" : "歷屆補救教學";
        $("#submitCustomData").hide();
        var urlListDict = {
            "pintong": ["https://dl.dropbox.com/s/j9tcnyrr8b2t16b/pintong_remedial_result.txt",
                        "https://dl.dropbox.com/s/snfffgshh19hen3/pintong_junyi_result.txt"],
            "past_remedial": ["https://dl.dropbox.com/s/zs8zn93oxqjkwqf/top_result.txt",
                              "https://dl.dropbox.com/s/wpwpl7g1xyvpyrs/junyi_result.txt"],
        };
        this.updateData(urlListDict[resource]);
    }
}
GraphDataSource.prototype.updateData = function(urlList) {
    var self = this;
    $("#dropdownStudentButton").attr("disabled", true);
    $("#dropdownNetworkButton").attr("disabled", true);
    $("#editModeBtn").attr("disabled", true);
    var remedial = $.ajax({
        type: "GET",
        url: urlList[0],
        dataType: "text",
        success: function (data) {
            self.loadRemedialJson(data);
        }
    });
    var junyi = $.ajax({
        type: "GET",
        url: urlList[1],
        dataType: "text",
        success: function (data) {
            self.loadJunyiJson(data);
        }
    });
    w = $.when(remedial, junyi);
    w.done(function () {
        curEmail = "";
        this.resetData();
        //changeModeAndRedraw(); > redraw in view
        $("#dropdownNetworkButton").removeAttr("disabled");
        $("#editModeBtn").removeAttr("disabled");
    });
}

GraphDataSource.prototype.getDisplayData = function(cgLevel, onlyRemedialResult){
    if(!this.curEmail){
        alert("沒有選擇學生，請選擇學生！");
        return
    }
    var filterType = onlyRemedialResult ? "remedial" : "all";
    var studentData = this.resultData[curEmail];
    var filterData = [];
    // add condition to prevent unused loop
    if (filterType === "all" && curDate === "all"){
        filterData = studentData;
    } else {
        filterData = studentData.filter(function (result) {
            var typeMatched = (filterType === "all") ? true : (result["type"] === filterType);
            var timeMatched = (curDate === "all") ? true : ((result["date"] === curDate) || result["type"] === "junyi"); // display specific date of remedial result and all junyi result
            return typeMatched && timeMatched
        });
    }

    var displayData = {};
    var descDict = {
        "fit": "學會",
        "under5": "做不到 5 題",
        "not_fit": "不適合",
        "easy": "已經會",
    }
    for(var i=0; i<filterData.length; i++){
        var result = filterData[i];
        if(result["name"] in displayData){
            continue
        } else {
        }

        var desc = "";
        if(result["type"] === "remedial"){
            desc = descDict[result["status"]] + ' ' + this.getExName();
        } else {
            desc = '補救教學結果：' + descDict[result["status"]];
        }
        if(result["date"]){
            desc = result["date"] + ' ' + desc;
        }
        displayData[result["name"]] = {
            date: displayData[result["name"]][date] ? (displayData[result["name"]][date] > result["date"] ? displayData[result["name"]][date] : result["date"]) : result["date"],
            status: 1,
        }
    }

}

// transfer cg, ex, section relation function
GraphDataSource.prototype.cgToSection = function(cg) {
    var exerciseList = this.cgToExercise[cg] || [];
    var sectionList = []
    for (var idx = 0; idx < this.exerciseList.length; idx++) {
        var sectionName = this.exToSection(exerciseList[idx]);
        if (sectionName && sectionList.indexOf(sectionName) === -1) {
            sectionList.push(sectionName);
        }
    }
    if (sectionList.length === 0) {
        var sectionList = this.curNodeList.reduce(function (result, node) {
            if (node["cg"] === cg) {
                result.push(node["id"])
            }
            return result
        }, []);
    }
    return sectionList;
}
GraphDataSource.prototype.exToSection = function(exId) {
    var matchedExercise = this.liveExercise.find(function (exercise) {
        return exercise["content_id"] === exId
    });
    var sectionName = "";
    if(matchedExercise){
        var chapter = matchedExercise["chapter_title"];
        var section = matchedExercise["section_title"];
        sectionName = chapter + "_" + section;
    }
    return sectionName
}
GraphDataSource.prototype.exToCg = function(ex_id) {

    var cgName = [];
    for(var i = 0; i<this.liveExercise.length; i++){
        var exercise = this.liveExercise[i];
        if(exercise["content_id"] === ex_id){
            cg_id = exercise["curriculum_guideline_id"];
            if(cgName.indexOf(cg_id) === -1){
                cgName.push(cg_id);
            }
        }
    }
    return cgName
}
GraphDataSource.prototype.getExName = function(exId) {
    var matchedExercise = liveExercise.find(function (exercise) {
        return exercise["content_id"] === exId
    });
    var exerciseName = "";
    if (matchedExercise) {
        exerciseName = matchedExercise["content_title"];
    }
    return exerciseName
}





//////////// need to modify
//data
GraphDataSource.prototype.getRemedialResultByTime = function(time) {
    var remedial_result_tmp = results_obj[curEmail];
    if (!remedial_result_tmp) { remedial_result_tmp = {}; }
    var remedial_result = {};
    // 整理obj
    if (time == 'all') {
        for (var cg in remedial_result_tmp) {
            if (!CgLevel) {
                sectionList = cgToSection(cg);
            } else {
                sectionList = [cg];
            }
            cg_obj = remedial_result_tmp[cg];
            if (Array.isArray(cg_obj)) {
                max_status = "";
                max_date = "";
                for (var i = 0; i < cg_obj.length; i++) {
                    if (!max_status & !max_date) {
                        max_status = cg_obj[i]['status'];
                        max_date = cg_obj[i]['date'];
                    } else {
                        this_status = cg_obj[i]['status'];
                        if (this_status < max_status) {
                            // because O < T < X
                            max_status = cg_obj[i]['status'];
                            max_date = cg_obj[i]['date'];
                        }
                    }
                }
                for (var i = 0; i < sectionList.length; i++) {
                    section = sectionList[i];
                    remedial_result[section] = {
                        'status': max_status,
                        'date': max_date,
                    }
                }
            } else {
                if (!cg_obj['status']) {
                    for (var i = 0; i < sectionList.length; i++) {
                        section = sectionList[i];
                        remedial_result[section] = {
                            'status': cg_obj,
                            'date': "NA",
                        };
                    }
                } else {
                    for (var i = 0; i < sectionList.length; i++) {
                        section = sectionList[i];
                        remedial_result[section] = cg_obj;
                    }
                }
            }
        }
    } else {
        for (var cg in remedial_result_tmp) {
            if (!CgLevel) {
                sectionList = cgToSection(cg);
            } else {
                sectionList = [cg];
            }
            cg_obj = remedial_result_tmp[cg];
            if (Array.isArray(cg_obj)) {
                for (var i = 0; i < cg_obj.length; i++) {
                    if (cg_obj[i]['date'] === time) {
                        for (var j = 0; j < sectionList.length; j++) {
                            section = sectionList[j];
                            remedial_result[section] = cg_obj[i];
                        }
                        break;
                    }
                }
            } else {
                if (cg_obj['date'] === time) {
                    for (var j = 0; j < sectionList.length; j++) {
                        section = sectionList[j];
                        remedial_result[section] = cg_obj;
                    }
                }
            }
        }
    }
    $("#dropdownDateButton")[0].innerHTML = time === 'all' ? "所有時間" : time;
    return remedial_result
}
//data
GraphDataSource.prototype.getJunyiResult = function() {
    if (!junyi_obj) {
        return {};
    }
    student_in_jy = junyi_obj[curEmail];
    if (!student_in_jy) { student_in_jy = {}; }
    var junyi_result = {};
    var section_result = {}
    for (var ex_id in student_in_jy) {
        ex_result = student_in_jy[ex_id];
        ex_result["title"] = getExName(ex_id);
        var sectionNameList = CgLevel ? exToCg(ex_id) : [exToSection(ex_id)];
        for (var sec_idx = 0; sec_idx < sectionNameList.length; sec_idx++) {
            var sectionName = sectionNameList[sec_idx];
            if (!(sectionName in section_result)) {
                section_result[sectionName] = [];
            }
            section_result[sectionName].push(ex_result);
        }
    }
    for (var sectionName in section_result) {
        junyi_result[sectionName] = summaryResult(section_result[sectionName])
    }
    return junyi_result
}
//data
GraphDataSource.prototype.summaryResult = function(resultList) {
    desc = [];
    data = [];
    status = "";
    count = {
        "under5": 0,
        "easy": 0,
        "fit": 0,
        "not_fit": 0,
    };
    status_word = {
        "under5": "還沒等級一",
        "easy": "已經會了",
        "fit": "學會",
        "not_fit": "不適合",
    };
    for (var i = 0; i < resultList.length; i++) {
        result = resultList[i];
        count[result["status"]] += 1;
        desc.push(result["date"] + '  ' + result["title"] + '  ' + status_word[result["status"]]);
        data.push(result);
    }
    desc = desc.join('\n');
    max_count = 0;
    for (var s in count) {
        if (count[s] >= max_count) {
            max_count = count[s];
            status = s;
        }
    }
    return {
        "status": status,
        "date": desc,
        "data": data,
    }
}
//data
GraphDataSource.prototype.mergeTwoResult = function(remedial_result, junyi_result) {
    var result_obj = jQuery.extend(true, {}, remedial_result);
    for (var sectionName in junyi_result) {
        if (!(sectionName in remedial_result)) {
            result_obj[sectionName] = junyi_result[sectionName];
        } else {
            // handle the conflict status
            if ((remedial_result[sectionName]['status'] === 'O' && junyi_result[sectionName]['status'] === 'not_fit') ||
                (remedial_result[sectionName]['status'] === 'X' &&
                    (junyi_result[sectionName]['status'] === 'easy' || junyi_result[sectionName]['status'] === 'fit'))) {
                result_obj[sectionName]['status'] = 'conflict';
            }
            // combine the date
            if (remedial_result[sectionName]['date'] !== 'NA' || remedial_result[sectionName]['date'] !== 'nan') {
                result_obj[sectionName]['date'] = remedial_result[sectionName]['date'] + ' 補救結果：' + remedial_result[sectionName]['status'] + '\n' + junyi_result[sectionName]['date'];
            } else {
                result_obj[sectionName]['date'] = '補救結果：' + remedial_result[sectionName]['status'] + '\n' + junyi_result[sectionName]['date'];
            }
            result_obj[sectionName]['data'] = junyi_result[sectionName]['data'].push(junyi_result[sectionName])
        }
    }
    return result_obj
}