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
    // current display mode
    this.cgLevel = false;
    this.displayJunyiResult = true;

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

    // status
    this.searchStatus = {
        "learned": ["O", "easy", "fit"],
        "not_learned": ["X", "not_fit"],
        "not_sure": ["T", "under5"],
    }
}
// Graph element
GraphDataSource.prototype.initialGraphElement = function(callbackView) {
    var self = this;
    var f1 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/c5ib14yaw6hmh2k/shujun_fraction_in_line_v2.csv",
        dataType: "text",
        success: function (data) {
            relationList = self.processData(data);
            graphElement = self.createGraphElement(relationList);
            self.secNodeList = graphElement[0];
            self.secYishengList = graphElement[1];
        }
    });
    var f2 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/o9m8rjgo4uroara/inchai_fraction_in_line.csv",
        dataType: "text",
        success: function (data) {
            relationList = self.processData(data);
            graphElement = self.createGraphElement(relationList);
            self.secInchaiList = graphElement[1];
        }
    });
    var f3 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/gce26byflmuq7ch/live_exercise.csv",
        dataType: "text",
        success: function (data) {
            self.liveExercise = self.processData(data);
        }
    });
    var f4 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/218287ehwulzj1a/pintong_remedial_result_for_teacher.txt", //"https://dl.dropbox.com/s/j9tcnyrr8b2t16b/pintong_remedial_result.txt",
        dataType: "text",
        success: function (data) {
            self.loadRemedialJson(data);
        }
    });
    var f5 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/uj4r7vfqtr6u0t0/pintong_junyi_result_for_teacher.txt", //"https://dl.dropbox.com/s/snfffgshh19hen3/pintong_junyi_result.txt",
        dataType: "text",
        success: function (data) {
            self.loadJunyiJson(data);
        }
    });
    var f6 = $.ajax({
        type: "GET",
        url: "https://dl.dropbox.com/s/c9lj3pf0obgix0o/the7to20_user_lv1_time.csv",
        dataType: "text",
        success: function (data) {
            self.exerciseLearnedTime = self.processData(data);
        }
    });
    w = $.when(f1, f2, f3, f4, f5, f6);
    w.done(function () {
        self.curNodeList = jQuery.extend(true, [], self.secNodeList);
        self.curEdgeList = jQuery.extend(true, [], self.secYishengList);
        self.curNodeList = GraphUtil.setLevel(self.curNodeList, self.curEdgeList);
        self.curRelation = "yisheng";
        callbackView(self.curNodeList, self.curEdgeList);
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
    this.curEmail = "";
    this.curDate = 'all';
    this.updateCurGrphElement();
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
    //$(".submit_junyi").show();
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

GraphDataSource.prototype.updateData = function (urlList, finishUpdateCallback) {
    var self = this;
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
        finishUpdateCallback();
    });
}

GraphDataSource.prototype.getDisplayNodeList = function(){
    var self = this;
    if(!this.curEmail){
        return this.curNodeList
    }
    var studentData = this.resultData[this.curEmail];
    var filterData = [];
    // add condition to prevent unused loop
    if (this.displayJunyiResult && this.curDate === "all"){
        filterData = studentData;
    } else {
        filterData = studentData.filter(function (result) {
            var typeMatched = self.displayJunyiResult ? true : (result["type"] === "remedial");
            var timeMatched = (self.curDate === "all") ? true : ((result["date"] === self.curDate) || result["type"] === "junyi"); // display specific date of remedial result and all junyi result
            return typeMatched && timeMatched
        });
    }
    var junyiData = {};
    var remedialData = {};
    var descDict = {
        "fit": "學會",
        "under5": "做不到 5 題",
        "not_fit": "不適合",
        "easy": "已經會",
        "O": "O 答對",
        "T": "△ 半對",
        "X": "X 答錯",
    }
    for(var i=0; i<filterData.length; i++){
        var result = filterData[i];
        // we handle remedial and junyi data in different way
        if(result["type"] === "remedial"){
            var name = this.cgLevel ? result["name"] : this.cgToSection(result["name"]);
            if (!(name in remedialData)){
                // we handle the desciption later
                remedialData[name] = {
                    date: result["date"],
                    status: result["status"],
                    desc: "",
                };
            }
            var needUpdate = remedialData[name]["date"] ? (remedialData[name]["date"] < result["date"]) : true;
            if(needUpdate){
                remedialData[name]["date"] = result["date"];
                remedialData[name]["status"] = result["status"];
            }
            var curDesc = '補救教學結果：' + descDict[result["status"]];
            if (result["date"]) {
                curDesc = result["date"] + ' ' + curDesc;
            }
            remedialData[name]["desc"] += "\n" + curDesc;
        } else {
            var name = this.cgLevel ? this.exToCg(result["name"]) : this.exToSection(result["name"]);
            if(!(name in junyiData)){
                junyiData[name] = {
                    // we count the status in junyi case
                    date: result["date"],
                    desc: "",
                    status: {
                        under5: 0,
                        not_fit: 0,
                        fit: 0,
                        easy: 0,
                    }
                };
            } else {
                // only remember the latest date
                if(!junyiData[name]["date"] || result["date"] > junyiData[name]["date"]){
                    junyiData[name]["date"] = result["date"];
                }
            }
            junyiData[name]["status"][result["status"]] += 1;
            var curDesc = descDict[result["status"]] + ' ' + this.getExName(result["name"]);
            if (result["date"]) {
                curDesc = result["date"] + ' ' + curDesc;
            }
            junyiData[name]["desc"] += "\n" + curDesc;
        }
    }
    var displayData = this.combineAndSummary(remedialData, junyiData);

    // 將整理好的資料放入 nodeList
    var nodeListTmp = jQuery.extend(true, [], this.curNodeList);
    for (var i = 0; i < nodeListTmp.length; i++) {
        var nodeId = nodeListTmp[i]["id"];
        if (nodeId in displayData) {
            nodeListTmp[i]["group"] = displayData[nodeId]["status"];
            nodeListTmp[i]["label"] = nodeListTmp[i]["name"] + displayData[nodeId]["desc"];
            nodeListTmp[i]["date"] = displayData[nodeId]["date"];
        }
        // maybe don't need it
        // } else {
        //     nodeListTmp[i]['group'] = undefined;
        //     nodeListTmp[i]['label'] = nodeListTmp[i]['name'];
        // }
    }
    // guess the unknown node
    for (var i = 0; i < nodeListTmp.length; i++) {
        var node = nodeListTmp[i];
        var nodeId = node["id"];
        if ( this.searchStatus["not_learned"].indexOf(node['group']) !== -1 ) {
            nodeListTmp = this.guessNodeGroup(nodeId, nodeListTmp, this.curEdgeList, 'forward');
        } else if (this.searchStatus["learned"].indexOf(node["group"]) !== -1 ) {
            nodeListTmp = this.guessNodeGroup(nodeId, nodeListTmp, this.curEdgeList, 'backward');
        }
    }
    $("#guess-learned-text")[0].innerHTML = "";
    // change status if we guess student learned the skill later
    for (var i = 0; i < nodeListTmp.length; i++) {
        var node = nodeListTmp[i];
        var nodeId = node["id"];
        //// think whether need to consider the remedial case
        if (node['group'] === 'fit' || node['group'] === 'easy') {
            var nodeDate = node["date"];
            nodeListTmp = this.recursiveFillLearnedNode(nodeId, nodeDate, nodeListTmp, this.curEdgeList, 3)
        }
    }
    // update the curNodeList
    this.curNodeList = nodeListTmp;

    return this.curNodeList
}

GraphDataSource.prototype.combineAndSummary = function(remedialData, junyiData){
    function summaryStatus(statusDict){
        var maxCount = 0;
        var maxStatus = "";
        for(var s in statusDict){
            var curCount = statusDict[s];
            if(curCount >= maxCount){
                maxCount = curCount;
                maxStatus = s;
            }
        }
        return maxStatus
    }
    var displayData = remedialData;
    for(var name in junyiData){
        junyiData[name]["status"] = summaryStatus(junyiData[name]["status"]);
        if( !(name in displayData) ){
            displayData[name] = junyiData[name];
        } else {
            displayData[name] = {
                date: remedialData[name]["date"] > junyiData[name]["date"] ? remedialData[name]["date"] : junyiData[name]["date"],
                desc: remedialData[name]["desc"] + junyiData[name]["desc"],
                satus: remedialData[name]["date"] > junyiData[name]["date"] ? remedialData[name]["status"] : junyiData[name]["status"],
            }
            // handle the conflict case
            if ( (this.searchStatus["learned"].indexOf(remedialData[name]["status"]) === -1 && this.searchStatus["not_learned"].indexOf(remedialData[name]["status"]) === -1) ||
                 (this.searchStatus["not_learned"].indexOf(remedialData[name]["status"]) === -1 && this.searchStatus["learned"].indexOf(remedialData[name]["status"]) === -1)){
                // or add new attribute "conflict"
                displayData[name]["status"] = "conflict";
            }
        }
    }
    return displayData;
}
// guess the unknown result node
GraphDataSource.prototype.guessNodeGroup = function(nodeId, _nodeList, _edgeList, way) {

    for (var i = 0; i < _edgeList.length; i++) {
        var edge = _edgeList[i];
        if ((way === 'forward' && edge['from'] === nodeId) ||
            (way === 'backward' && edge['to'] === nodeId)) {
            var guessNodeId = way === 'forward' ? edge['to'] : edge['from'];
            for (var j = 0; j < _nodeList.length; j++) {
                var _node = _nodeList[j];
                if (_node['id'] === guessNodeId && !_node['group']) {
                    _nodeList[j]['group'] = way === 'forward' ? 'guessX' : 'guessO';
                    _nodeList = this.guessNodeGroup(guessNodeId, _nodeList, _edgeList, way);
                    break // at most 1 node matched
                } else if (_node['id'] === guessNodeId && _node['group']) {
                    if ((way === 'backward' && _node['group'] === 'guessX') ||
                        (way === 'forward' && _node['group'] === 'guessO')) {
                        _nodeList[j]['group'] = 'guessT';
                        _nodeList = this.guessNodeGroup(guessNodeId, _nodeList, _edgeList, way);
                        break // at most 1 node matched
                    }
                }
            }
        }
    }
    return _nodeList
}
// When student learned some skill later, we guess the student is already learned some skill before that skill.
GraphDataSource.prototype.recursiveFillLearnedNode = function(_nodeId, _date, _curNodeList, _curEdgeList, _rememberNumber) {
    var prevNodeIds = _curEdgeList.reduce(function (result, edge) {
        if (edge["to"] === _nodeId) {
            result.push(edge["from"]);
        }
        return result
    }, []);
    _rememberNumber = _rememberNumber - prevNodeIds.length;
        
    for (var prevIdx = 0; prevIdx < prevNodeIds.length; prevIdx++) {
        var prevNodeId = prevNodeIds[prevIdx];
        var prevNode = GraphUtil.getNodeById(prevNodeId, _curNodeList);
        var prevDate = prevNode['date'];
        if (this.searchStatus["learned"].indexOf(prevNode['group']) === -1) {
            if ( (_rememberNumber < 0) || (prevDate && prevDate > _date) ) {
                // stop guess status
                return _curNodeList
            } else {
                for (var nodeIdx = 0; nodeIdx < _curNodeList.length; nodeIdx++) {
                    if (_curNodeList[nodeIdx]['id'] === prevNodeId) {
                        if (this.searchStatus["not_learned"].indexOf(_curNodeList[nodeIdx]['group']) !== -1 ||
                            this.searchStatus["not_sure"].indexOf(_curNodeList[nodeIdx]['group']) !== -1){
                            //$("#guess-learned-text").append("<div>因為後面的單元學會了，因此判定 " + prevNodeId + " 已經學會</div>");
                        }
                        _curNodeList[nodeIdx]['group'] = 'guessO';
                        
                        break;
                    }
                }
                _curNodeList = this.recursiveFillLearnedNode(prevNodeId, _date, _curNodeList, _curEdgeList, _rememberNumber)
            }
        }
    }
    return _curNodeList
}




// transfer cg, ex, section relation function
GraphDataSource.prototype.cgToSection = function(cg) {
    var exerciseList = this.cgToExercise[cg] || [];
    var sectionList = []
    for (var idx = 0; idx < exerciseList.length; idx++) {
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
    var matchedExercise = this.liveExercise.find(function (exercise) {
        return exercise["content_id"] === exId
    });
    var exerciseName = "";
    if (matchedExercise) {
        exerciseName = matchedExercise["content_title"];
    }
    return exerciseName
}
GraphDataSource.prototype.getExBySection = function(section){
    var splitName = section.split('_');
    var chapterName = splitName[0];
    var sectionName = splitName[1];
    var matchedExercise = this.liveExercise.filter(function(exercise){
        var matched = exercise["chapter_title"] === chapterName && exercise["difficulty"] === "基礎";
        if(sectionName){
            return matched && exercise["section_title"] === sectionName
        } else {
            return matched
        }
    });
    if(matchedExercise.length === 0){
        matchedExercise = this.liveExercise.filter(function (exercise) {
            var matched = exercise["chapter_title"] === chapterName && exercise["difficulty"] === "一般";
            if (sectionName) {
                return matched && exercise["section_title"] === sectionName
            } else {
                return matched
            }
        });
    }
    return matchedExercise
}
GraphDataSource.prototype.getChapterId = function(section){
    var splitName = section.split('_');
    var chapterName = splitName[0];
    var sectionName = splitName[1];
    var matchedExercise = this.liveExercise.find(function (exercise) {
        var matched = exercise["chapter_title"] === chapterName;
        if (sectionName) {
            return matched && exercise["section_title"] === sectionName
        } else {
            return matched
        }
    });
    return matchedExercise['chapter_id']
}
GraphDataSource.prototype.getLearnedTime = function(exId){
    var matchedExercise = this.exerciseLearnedTime.find(function (exercise) {
        return exercise["exercise"] === exId
    });
    if(matchedExercise){
        return Number(matchedExercise["get_lv1_time_90"])
    } else {
        return 0
    }
}

// set variable
// maybe don't need it
GraphDataSource.prototype.setCurGraphElement = function(nodeList, edgeList){
    this.curNodeList = nodeList;
    this.curEdgeList = edgeList;
}
GraphDataSource.prototype.getCurGraphElement = function(){
    return [this.curNodeList, this.curEdgeList]
}
// think about the setLevel function 
GraphDataSource.prototype.updateCurGrphElement = function(){
    // update Edge
    if (this.curRelation === "inchai") {
        this.curEdgeList = this.cgLevel ? this.cgInchaiList : this.secInchaiList;
    } else {
        this.curEdgeList = this.cgLevel ? this.cgYishengList : this.secYishengList;
    }
    // update node data
    this.curNodeList = this.cgLevel ? this.cgNodeList : this.secNodeList;
    this.curNodeList = this.getDisplayNodeList();
    
    this.curNodeList = GraphUtil.setLevel(this.curNodeList, this.curEdgeList);
}
GraphDataSource.prototype.setRelation = function (relation) {
    this.curRelation = relation;
    this.updateCurGrphElement();
}
GraphDataSource.prototype.setDisplayLevel = function(cgLevel){
    this.cgLevel = cgLevel;
    this.updateCurGrphElement();
}
GraphDataSource.prototype.setDisplayJunyiResult = function(displayJunyiResult){
    this.displayJunyiResult = displayJunyiResult;
    this.updateCurGrphElement();
}
GraphDataSource.prototype.setEmail = function(email){
    this.curEmail = email;
    this.updateCurGrphElement();
}
GraphDataSource.prototype.setDisplayDate = function (date) {
    this.curDate = date;
    this.updateCurGrphElement();
}
GraphDataSource.prototype.getStudentList = function(){
    if(!this.resultData){
        return
    }
    var studentList = Object.keys(this.resultData);
    return studentList
}
GraphDataSource.prototype.getDateList = function(){
    if(!this.curEmail){
        alert("請先選擇學生！")
        return
    }
    var studentData = this.resultData[this.curEmail];
    // to get unique date list
    var dateDict = {};
    for(var i=0; i< studentData.length; i++){
        var resultObj = studentData[i];
        if(resultObj['date'] && resultObj['type']==='remedial'){
            dateDict[resultObj['date']] = true;
        }
    }
    var dateList = Object.keys(dateDict);
    return dateList
}