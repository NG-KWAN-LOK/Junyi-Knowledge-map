function GraphView(options){
    this.options = options;
    this.network = undefined;
}

GraphView.prototype.setDataSource = function(graphDataSource){
    this.graphDataSource = graphDataSource;
}
GraphView.prototype.init = function(){
    var self = this;
    // bind the event
    document.getElementById("setRelationYisheng").onclick = function(){ self.setRelation("yisheng"); };
    document.getElementById("setRelationInchai").onclick = function(){ self.setRelation("inchai"); };
    document.getElementById("isCgLevel").onchange = function(){ self.handleDisplayLevelChange(); };
    document.getElementById("displayJunyiResult").onchange = function(){ self.handleDisplayJunyiResultChange(); };
    var dataDropdownElements = document.getElementsByClassName("dataDropdown")
    Array.prototype.forEach.call(dataDropdownElements, function(element) {
        element.onclick = function(){ self.handleChangeDataButton(this.id); };
    });
    

    // init the graph
    var callbackView = function(nodeList, edgeList){
        $("#dropdownNetworkButton").removeAttr("disabled");
        $("#editModeBtn").removeAttr("disabled");
        self.updateStudentDropdown();

        // create a network
        var container = document.getElementById('cg_network');

        s_nodes = new vis.DataSet(nodeList);
        s_edges = new vis.DataSet(edgeList);

        var data = {
            nodes: s_nodes,
            edges: s_edges,
        };

        // initialize network
        self.network = new vis.Network(container, data, this.options);
        self.network.on("initRedraw", function () {
            var startPointViewList = self.getStartPoint(Object.values(self.network.body.data.nodes._data), Object.values(self.network.body.data.edges._data));
            self.updateStarPointView(startPointViewList);
        });
    }
    graphDataSource.initialGraphElement(callbackView);
}

GraphView.prototype.redrawNetwork = function(){
    var graphElement = this.graphDataSource.getCurGraphElement();
    this.network.setData({
        nodes: new vis.DataSet(graphElement[0]),
        edges: new vis.DataSet(graphElement[1]),
    });
    this.network.redraw();
}
GraphView.prototype.setRelation = function(relationType){
    this.graphDataSource.setRelation(relationType);
    $("#dropdownNetworkButton")[0].innerHTML = relationType === "yisheng" ? "宜陞" : "因材";
    this.redrawNetwork();

    //////// need to modify
    //curEdgeList = this.cgLevel ? cgYishengList : yishengList;
    //curEdgeList = changeEdgeColor({}, curEdgeList);
    //setAndRedrawNetwork();   
}
GraphView.prototype.handleDisplayLevelChange = function(){
    var cgLevel = document.getElementById("isCgLevel").checked;
    this.graphDataSource.setDisplayLevel(cgLevel);
    this.redrawNetwork();
}
GraphView.prototype.handleDisplayJunyiResultChange = function(){
    var displayJunyiResult = document.getElementById("displayJunyiResult").checked;
    this.graphDataSource.setDisplayJunyiResult(displayJunyiResult);
    this.redrawNetwork();
}
GraphView.prototype.handleChangeDataButton = function (resource) {
    var self = this;
    this.graphDataSource.resetData();
    if (resource === "custom") {
        $("#dropdownDataButton")[0].innerHTML = "自行匯入";
        $("#submitCustomData").show();
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
        $("#dropdownStudentButton").attr("disabled", true);
        $("#dropdownNetworkButton").attr("disabled", true);
        $("#editModeBtn").attr("disabled", true);
        var finishUpdateCallback = function(){
            self.redrawNetwork();
            self.updateStudentDropdown();
            $("#dropdownNetworkButton").removeAttr("disabled");
            $("#editModeBtn").removeAttr("disabled");
            $("#dropdownStudentButton")[0].innerHTML = "選擇學生";
            $("#dropdownDateButton")[0].innerHTML = "選擇時間";
        }
        this.graphDataSource.updateData(urlListDict[resource], finishUpdateCallback);
    }
}
GraphView.prototype.setEmail = function(email){
    $("#dropdownStudentButton")[0].innerHTML = email;
    this.graphDataSource.setEmail(email);
    this.graphDataSource.setDisplayDate('all');
    this.updateDateDropdown();
    this.redrawNetwork();
}
GraphView.prototype.setDisplayDate = function (date) {
    $("#dropdownDateButton")[0].innerText = date;
    this.graphDataSource.setDisplayDate(date);
    this.redrawNetwork();
}
GraphView.prototype.updateStudentDropdown = function(){
    var self = this;
    var studentList = self.graphDataSource.getStudentList();
    var studentDropdown = $("#studentDropdownContainer");
    studentDropdown[0].innerHTML = "";
    for(var i=0; i<studentList.length; i++){
        var email = studentList[i];
        var stuItem = $("<a></a>").text(email);
        stuItem.attr("class", "dropdown-item");
        stuItem.attr("id", email);
        stuItem.on("click", function(){self.setEmail(this.id);} );
        studentDropdown.append(stuItem);
    }
    $("#dropdownStudentButton").removeAttr("disabled")
    $("#dropdownStudentButton")[0].innerHTML = "選擇學生";
}
GraphView.prototype.updateDateDropdown = function(){
    var self = this;
    var dateList = self.graphDataSource.getDateList();
    var dateDropdown = $("#dateDropdownContainer");
    dateDropdown[0].innerHTML = "";
    
    var createDateItem = function (id) {
        if (id === 'all') {
            var dateItem = $("<a></a>").text("所有時間");
        } else {
            var dateItem = $("<a></a>").text(id);
        }
        dateItem.attr("class", "dropdown-item");
        dateItem.attr("id", id);
        dateItem.on("click", function () { self.setDisplayDate(this.id); });
        return dateItem
    }
    dateDropdown.append(createDateItem('all'));
    for (var idx = 0; idx < dateList.length; idx++) {
        var date = dateList[idx];
        dateDropdown.append(createDateItem(date));
    }
    $("#dropdownDateButton").removeAttr("disabled");
    $("#dropdownDateButton")[0].innerHTML = "所有時間";
}


//////// modify

//view
GraphView.prototype.recursiveFindStartPoint = function(curStartNodeIdList, _curNodeList, _curEdgeList, statusList, checkCurNode) {

    var matchedNodeList = [];
    if (checkCurNode) {
        // combine this two for loop later
        var curNodeList = curStartNodeIdList.map(function (nodeId) {
            return GraphUtil.getNodeById(nodeId, _curNodeList)
        });
        for (var i = 0; i < curNodeList.length; i++) {
            var curNodeObj = curNodeList[i];
            if (statusList.indexOf(curNodeObj['group']) >= 0) {
                matchedNodeList.push(curNodeObj);
            }
        }
        if (matchedNodeList.length > 0) {
            return matchedNodeList
        }
    }

    var nextNodeIdList = _curEdgeList.reduce(function (result, edge) {
        if (curStartNodeIdList.indexOf(edge['from']) !== -1) {
            result.push(edge['to']);
        }
        return result
    }, []);

    // make list unique first to reduce the loop
    var uniqueObj = {};
    for (var i = 0; i < nextNodeIdList.length; i++) {
        uniqueObj[nextNodeIdList[i]] = true;
    }
    nextNodeIdList = Object.keys(uniqueObj);
    // combine this two for loop later
    var nextNodeList = nextNodeIdList.map(function (nodeId) {
        return GraphUtil.getNodeById(nodeId, _curNodeList)
    })
    for (var i = 0; i < nextNodeList.length; i++) {
        var nextNodeObj = nextNodeList[i];
        if (statusList.indexOf(nextNodeObj['group']) >= 0) {
            matchedNodeList.push(nextNodeObj);
        }
    }
    if (matchedNodeList.length > 0 || nextNodeIdList.length === 0) {
        return matchedNodeList
    } else {
        return this.recursiveFindStartPoint(nextNodeIdList, _curNodeList, _curEdgeList, statusList, false)
    }
}
//view
//need to refactor
GraphView.prototype.getStartPoint = function(_curNodeList, _curEdgeList) {
    var searchStatusDict = this.graphDataSource.searchStatus;

    // combine into one for loop
    var correctList = _curNodeList.filter(function (node) {
        return searchStatusDict['learned'].indexOf(node['group']) !== -1
    });
    var wrongList = _curNodeList.filter(function (node) {
        return searchStatusDict['not_learned'].indexOf(node['group']) !== -1
    });
    var notSureList = _curNodeList.filter(function (node) {
        return searchStatusDict['not_sure'].indexOf(node['group']) !== -1
    });
    if (correctList.length === 0 && wrongList.length === 0 && notSureList.length === 0) {
        $("#startPointText")[0].innerText = "沒有資料。";
        return
    }

    // initialize the list
    var startPointIdList = [];
    var startPointList = [];
    $("#recommend-panel-container")[0].innerHTML = "";
    var startPointViewList = [];
    // If the information is not enough to decide the start point, we set the start point to the begin of the cg
    if (correctList.length === 0 && wrongList.length === 0 && notSureList.length !== 0) {
        var startNotSureNodeIdList = GraphUtil.getStartNode(notSureList, _curEdgeList).concat(GraphUtil.getSingleNode(notSureList, _curEdgeList));
        for (var s_id = 0; s_id < startNotSureNodeIdList.length; s_id++) {
            var startNodeId = startNotSureNodeIdList[s_id];
            var startNode = GraphUtil.getNodeById(startNodeId, notSureList);
            var sameCgNodeList = _curNodeList.filter(function (node) {
                return node['cg'] === startNode['cg'] && searchStatusDict['learned'].concat(['guessO']).indexOf(node['group']) === -1
            });
            var startOfCgNodeIdList = GraphUtil.getStartNode(sameCgNodeList, _curEdgeList)
                .concat(GraphUtil.getSingleNode(sameCgNodeList, _curEdgeList));
            startPointIdList = startPointIdList.concat(startOfCgNodeIdList);
            startPointList = startPointIdList.map(function (node_id) {
                return GraphUtil.getNodeById(node_id, sameCgNodeList)
            });

            var startSectionList = startOfCgNodeIdList.map(function(node_id){
                var splitName = node_id.split('_');
                return splitName.length > 1 ? splitName[1] : splitName[0];
            });
            startPointViewList.push({
                type: "not_enough",
                notLearnedPointName: undefined,
                startPointName: startNode['cg'],
                startSection: startSectionList,
            });
        }
        
    } else if (wrongList.length !== 0) {
        // need to refactor
        // in this case, we should find the head of the chapter of the cg
        var startNodeIdList = GraphUtil.getStartNode(_curNodeList, _curEdgeList);
        startNodeIdList = startNodeIdList.concat(GraphUtil.getSingleNode(_curNodeList, _curEdgeList));
        startPointListTmp = this.recursiveFindStartPoint(startNodeIdList, _curNodeList, _curEdgeList, searchStatusDict['not_learned'], true);
        for (var s_id = 0; s_id < startPointListTmp.length; s_id++) {
            var startPointTmp = startPointListTmp[s_id];

            var sameCgNodeList = _curNodeList.filter(function (node) {
                return node['cg'] === startPointTmp['cg'] && searchStatusDict['learned'].indexOf(node['group']) === -1
            });
            var startOfCgNodeIdList = GraphUtil.getStartNode(sameCgNodeList, _curEdgeList)
                              .concat(GraphUtil.getSingleNode(sameCgNodeList, _curEdgeList));
            for(var i=0; i< startOfCgNodeIdList.length; i++){
                var startOfCgNode = GraphUtil.getNodeById(startOfCgNodeIdList[i], sameCgNodeList);

                var chapterName = startOfCgNode['id'].split("_")[0];
                var sameChapterNodeList = _curNodeList.filter(function (node) {
                    return node['id'].split("_")[0] === chapterName && searchStatusDict['learned'].concat(['guessO']).indexOf(node['group']) === -1
                });
                var startOfChapterNodeIdList = GraphUtil.getStartNode(sameChapterNodeList, _curEdgeList)
                    .concat(GraphUtil.getSingleNode(sameChapterNodeList, _curEdgeList));    
                startPointIdList = startPointIdList.concat(startOfChapterNodeIdList);
                startPointList = startPointIdList.map(function (node_id) {
                    return GraphUtil.getNodeById(node_id, _curNodeList)//sameChapterNodeList)
                });

                var startSectionList = startOfChapterNodeIdList.map(function (node_id) {
                    var splitName = node_id.split('_');
                    return splitName.length > 1 ? splitName[1] : splitName[0];
                });
                startPointViewList.push({
                    type: "not_learned",
                    notLearnedPointName: startPointTmp['id'],
                    startPointName: chapterName,
                    startSection: startSectionList,
                });
            }
        }
    }
    if (startPointList.length === 0) {
        $("#startPointText")[0].innerText = "沒有推薦的起始點。";
    } else {
        var startPointNameList = startPointList.map(function (node) {
            return node['name'].replace('\n', ' ')
        });
        $("#startPointText")[0].innerText = "推薦起始點為：" + startPointNameList.join('、') + '。';
    }
    return startPointViewList
}
GraphView.prototype.updateStarPointView = function(startPointViewList){
    if(startPointViewList){
        for(var i=0; i<startPointViewList.length; i++){
            startPointViewObj = startPointViewList[i];
            if(startPointViewObj['type'] === "not_enough"){
                $("#recommend-panel-container").append("<div>由於測驗以及歷程不足，建議從分年細目 " + startPointViewObj['startPointName'] + " 的觀念 " + startPointViewObj["startSection"].join('、') + " 開始</div>")
            } else {
                $("#recommend-panel-container").append("<div>學生於 " + startPointViewObj['notLearnedPointName'] + " 沒學會，建議從此次主題 " + startPointViewObj['startPointName'] + " 的觀念 " + startPointViewObj["startSection"].join('、') + " 開始</div>")
                var recommendElement = ""
                for (var j=0; j<startPointViewObj["startSection"].length; j++){
                    var sectionName = startPointViewObj['startPointName'] + "_" + startPointViewObj["startSection"][j]
                    var exerciseList = this.graphDataSource.getExBySection(sectionName);
                    var exerciseContent = "";
                    for(var ex_idx=0; ex_idx < exerciseList.length; ex_idx++){
                        exercise = exerciseList[ex_idx];
                        exerciseContent+="<div><a target=\"_blank\" href=\"https://www.junyiacademy.org/exercise/"+exercise["content_id"]+"\">"+exercise["content_title"]+"</a></div>";
                    }
                    recommendElement += "<tr><td class=\"recommendTableCell\">" + sectionName +"</td><td class=\"recommendTableCell\">"+exerciseContent+"</td></tr>"
                }
                $("#recommend-panel-container").append("<table class=\"recommendTable\"><tbody>"+recommendElement+"</tbody></table>");
            }
            
        }
    }
}