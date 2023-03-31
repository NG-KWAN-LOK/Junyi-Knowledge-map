function GraphView(options) {
  this.options = options;
  this.network = undefined;
}

GraphView.prototype.setDataSource = function (graphDataSource) {
  this.graphDataSource = graphDataSource;
};
GraphView.prototype.init = function () {
  var self = this;
  // bind the event
  document.getElementById("setRelationYisheng").onclick = function () {
    self.setRelation("yisheng");
  };
  document.getElementById("setRelationInchai").onclick = function () {
    self.setRelation("inchai");
  };
  document.getElementById("isCgLevel").onchange = function () {
    self.handleDisplayLevelChange();
  };
  document.getElementById("displayJunyiResult").onchange = function () {
    self.handleDisplayJunyiResultChange();
  };
  document.getElementById("displayPath").onchange = function () {
    self.handleDisplayPathChange();
  };
  var dataDropdownElements = document.getElementsByClassName("dataDropdown");
  Array.prototype.forEach.call(dataDropdownElements, function (element) {
    element.onclick = function () {
      self.handleChangeDataButton(this.id);
    };
  });

  // init the graph
  var callbackView = function (nodeList, edgeList) {
    $("#dropdownNetworkButton").removeAttr("disabled");
    $("#editModeBtn").removeAttr("disabled");
    self.updateStudentDropdown();
    self.updateThemeDropdown();

    // create a network
    var container = document.getElementById("cg_network");

    s_nodes = new vis.DataSet(nodeList);
    s_edges = new vis.DataSet(edgeList);

    var data = {
      nodes: s_nodes,
      edges: s_edges,
    };

    // initialize network
    self.network = new vis.Network(container, data, this.options);
    self.network.on("initRedraw", function () {
      var startPointViewList = self.getStartPoint(
        Object.values(self.network.body.data.nodes._data),
        Object.values(self.network.body.data.edges._data)
      );
      self.updateStarPointView(startPointViewList);
    });

    // handle some event
    self.network.on("selectNode", function (object) {
      // $("#show_pre_post_network")[0].innerHTML = object;
      var subEdgeList = object["edges"].map(function (edgeId) {
        return self.network.body.data.edges._data[edgeId];
      });
      var subNodeIdList = subEdgeList.reduce(function (nodeList, edge) {
        var nodeId = edge["from"];
        if (nodeList.indexOf(nodeId) === -1) {
          nodeList.push(nodeId);
        }
        nodeId = edge["to"];
        if (nodeList.indexOf(nodeId) === -1) {
          nodeList.push(nodeId);
        }
        return nodeList;
      }, []);
      var subData = {
        nodes: new vis.DataSet(
          subNodeIdList.map(function (nodeId) {
            var nodeData = Object.assign(
              {},
              self.network.body.data.nodes._data[nodeId]
            );
            nodeData.level = undefined;
            return nodeData;
          })
        ),
        edges: new vis.DataSet(subEdgeList),
      };
      var subOptions = {
        nodes: {
          color: {
            background: "lightgray",
            hover: "SILVER",
            highlight: "SILVER",
          },
          borderWidth: 0,
        },
        edges: {
          arrows: "to",
          arrowStrikethrough: false,
          smooth: false,
        },
        layout: {
          hierarchical: {
            enabled: true,
            direction: "UD",
            edgeMinimization: true,
            levelSeparation: 150,
            nodeSpacing: 300,
            blockShifting: true,
            parentCentralization: true,
            sortMethod: "directed",
          },
        },
        groups: {
          O: {
            color: {
              background: "lightgreen",
              hover: "LIMEGREEN",
              highlight: "LIMEGREEN",
            },
            borderWidth: 3,
          },
          T: {
            color: { background: "yellow", hover: "GOLD", highlight: "GOLD" },
            borderWidth: 3,
          },
          X: {
            color: {
              background: "pink",
              hover: "INDIANRED",
              highlight: "INDIANRED",
            },
            borderWidth: 3,
          },
          guessO: {
            color: {
              background: "lawngreen",
              hover: "LIMEGREEN",
              highlight: "LIMEGREEN",
            },
            borderWidth: 0,
          },
          guessT: {
            color: { background: "yellow", hover: "GOLD", highlight: "GOLD" },
            borderWidth: 0,
          },
          guessX: {
            color: {
              background: "lightcoral",
              hover: "INDIANRED",
              highlight: "INDIANRED",
            },
            borderWidth: 0,
          },
          JY: { color: { background: "white" }, borderWidth: 3 },
          under5: {
            color: { background: "yellow", hover: "GOLD", highlight: "GOLD" },
            borderWidth: 3,
          },
          fit: {
            color: {
              background: "lightgreen",
              hover: "LIMEGREEN",
              highlight: "LIMEGREEN",
            },
            borderWidth: 3,
          },
          easy: {
            color: {
              background: "lightgreen",
              hover: "LIMEGREEN",
              highlight: "LIMEGREEN",
            },
            borderWidth: 3,
          },
          not_fit: {
            color: {
              background: "pink",
              hover: "INDIANRED",
              highlight: "INDIANRED",
            },
            borderWidth: 3,
          },
          unknown: {
            color: {
              background: "lightgray",
              hover: "SILVER",
              highlight: "SILVER",
            },
            borderWidth: 0,
          },
          conflict: { color: { background: "orange" }, borderWidth: 3 },
        },
        physics: {
          enabled: false,
        },
      };
      self.subNetwork = new vis.Network(
        document.getElementById("show_pre_post_network"),
        subData,
        subOptions
      );
    });
  };
  graphDataSource.initialGraphElement(callbackView);
};

GraphView.prototype.redrawNetwork = function () {
  var graphElement = this.graphDataSource.getCurGraphElement();
  this.network.setData({
    nodes: new vis.DataSet(graphElement[0]),
    edges: new vis.DataSet(graphElement[1]),
  });
  this.network.redraw();
};
GraphView.prototype.redrawNetworkByTheme = function (theme) {
  var graphElement = this.graphDataSource.getCurGraphElement(theme);
  this.network.setData({
    nodes: new vis.DataSet(graphElement[0]),
    edges: new vis.DataSet(graphElement[1]),
  });
  this.network.redraw();
};
GraphView.prototype.setRelation = function (relationType) {
  this.graphDataSource.setRelation(relationType);
  $("#dropdownNetworkButton")[0].innerHTML =
    relationType === "yisheng" ? "宜陞" : "因材";
  this.redrawNetwork();
};
GraphView.prototype.handleDisplayLevelChange = function () {
  var cgLevel = document.getElementById("isCgLevel").checked;
  this.graphDataSource.setDisplayLevel(cgLevel);
  this.redrawNetwork();
};
GraphView.prototype.handleDisplayJunyiResultChange = function () {
  var displayJunyiResult =
    document.getElementById("displayJunyiResult").checked;
  this.graphDataSource.setDisplayJunyiResult(displayJunyiResult);
  this.redrawNetwork();
};
GraphView.prototype.handleDisplayPathChange = function () {
  var displayPath = document.getElementById("displayPath").checked;
  if (displayPath) {
    document.getElementById("recommend-panel-container").style.display =
      "block";
  } else {
    document.getElementById("recommend-panel-container").style.display = "none";
  }
};
GraphView.prototype.handleThemeChange = function (theme) {
  this.redrawNetworkByTheme(theme);
};
GraphView.prototype.handleChangeDataButton = function (resource) {
  var self = this;
  this.graphDataSource.resetData();
  if (resource === "custom") {
    $("#dropdownDataButton")[0].innerHTML = "自行匯入";
    $("#submitCustomData").show();
    $("#dropdownStudentButton").attr("disabled", true);
    $("#dropdownDateButton").attr("disabled", true);
  } else {
    $("#dropdownDataButton")[0].innerHTML =
      resource === "pintong" ? "屏東補救教學" : "歷屆補救教學";
    $("#submitCustomData").hide();
    var urlListDict = {
      pintong: [
        "https://dl.dropbox.com/s/j9tcnyrr8b2t16b/pintong_remedial_result.txt",
        "https://dl.dropbox.com/s/snfffgshh19hen3/pintong_junyi_result.txt",
      ],
      past_remedial: [
        "https://dl.dropbox.com/s/zs8zn93oxqjkwqf/top_result.txt",
        "https://dl.dropbox.com/s/wpwpl7g1xyvpyrs/junyi_result.txt",
      ],
    };
    $("#dropdownStudentButton").attr("disabled", true);
    $("#dropdownNetworkButton").attr("disabled", true);
    $("#editModeBtn").attr("disabled", true);
    var finishUpdateCallback = function () {
      self.redrawNetwork();
      self.updateStudentDropdown();
      $("#dropdownNetworkButton").removeAttr("disabled");
      $("#editModeBtn").removeAttr("disabled");
      $("#dropdownStudentButton")[0].innerHTML = "選擇學生";
      $("#dropdownDateButton")[0].innerHTML = "選擇時間";
    };
    this.graphDataSource.updateData(
      urlListDict[resource],
      finishUpdateCallback
    );
  }
};
GraphView.prototype.setEmail = function (email) {
  $("#dropdownStudentButton")[0].innerHTML = email;
  this.graphDataSource.setEmail(email);
  this.graphDataSource.setDisplayDate("all");
  this.updateDateDropdown();
  this.redrawNetwork();
};
GraphView.prototype.setDisplayDate = function (date) {
  $("#dropdownDateButton")[0].innerText = date;
  this.graphDataSource.setDisplayDate(date);
  this.redrawNetwork();
};
GraphView.prototype.updateStudentDropdown = function () {
  var self = this;
  var studentList = self.graphDataSource.getStudentList();
  var studentDropdown = $("#studentDropdownContainer");
  studentDropdown[0].innerHTML = "";
  for (var i = 0; i < studentList.length; i++) {
    var email = studentList[i];
    var stuItem = $("<a></a>").text(email);
    stuItem.attr("class", "dropdown-item");
    stuItem.attr("id", email);
    stuItem.on("click", function () {
      self.setEmail(this.id);
    });
    studentDropdown.append(stuItem);
  }
  $("#dropdownStudentButton").removeAttr("disabled");
  $("#dropdownThemeButton").removeAttr("disabled");
  $("#dropdownStudentButton")[0].innerHTML = "選擇學生";
  $("#dropdownThemeButton")[0].innerHTML = "選擇主題";
};
GraphView.prototype.updateThemeDropdown = function () {
  var self = this;
  var themeList = self.graphDataSource.getThemeList();
  var themeDropdown = $("#themeDropdownContainer");
  themeDropdown[0].innerHTML = "";
  for (var i = 0; i < themeList.length; i++) {
    var theme = themeList[i];
    var themeItem = $("<a></a>").text(theme);
    themeItem.attr("class", "dropdown-item themeDropdown");
    themeItem.attr("id", theme);
    themeItem.on("click", function () {
      self.handleThemeChange(this.id);
    });
    themeDropdown.append(themeItem);
  }
  $("#dropdownThemeButton").removeAttr("disabled");
  $("#dropdownThemeButton")[0].innerHTML = "選擇主題";
};

GraphView.prototype.updateDateDropdown = function () {
  var self = this;
  var dateList = self.graphDataSource.getDateList();
  var dateDropdown = $("#dateDropdownContainer");
  dateDropdown[0].innerHTML = "";

  var createDateItem = function (id) {
    if (id === "all") {
      var dateItem = $("<a></a>").text("所有時間");
    } else {
      var dateItem = $("<a></a>").text(id);
    }
    dateItem.attr("class", "dropdown-item");
    dateItem.attr("id", id);
    dateItem.on("click", function () {
      self.setDisplayDate(this.id);
    });
    return dateItem;
  };
  dateDropdown.append(createDateItem("all"));
  for (var idx = 0; idx < dateList.length; idx++) {
    var date = dateList[idx];
    dateDropdown.append(createDateItem(date));
  }
  $("#dropdownDateButton").removeAttr("disabled");
  $("#dropdownDateButton")[0].innerHTML = "所有時間";
};

//////// modify

//view
GraphView.prototype.recursiveFindStartPoint = function (
  curStartNodeIdList,
  _curNodeList,
  _curEdgeList,
  statusList,
  checkCurNode,
  includingLeaf
) {
  var matchedNodeList = [];
  if (checkCurNode) {
    // combine this two for loop later
    var curNodeList = curStartNodeIdList.map(function (nodeId) {
      return GraphUtil.getNodeById(nodeId, _curNodeList);
    });
    for (var i = 0; i < curNodeList.length; i++) {
      var curNodeObj = curNodeList[i];
      if (statusList.indexOf(curNodeObj["group"]) >= 0) {
        matchedNodeList.push(curNodeObj);
      }
    }
    if (matchedNodeList.length > 0) {
      return matchedNodeList;
    }
  }

  var nextNodeIdList = _curEdgeList.reduce(function (result, edge) {
    if (curStartNodeIdList.indexOf(edge["from"]) !== -1) {
      result.push(edge["to"]);
    }
    return result;
  }, []);

  // make list unique first to reduce the loop
  var uniqueObj = {};
  for (var i = 0; i < nextNodeIdList.length; i++) {
    uniqueObj[nextNodeIdList[i]] = true;
  }
  nextNodeIdList = Object.keys(uniqueObj);
  // combine this two for loop later
  var nextNodeList = nextNodeIdList.map(function (nodeId) {
    return GraphUtil.getNodeById(nodeId, _curNodeList);
  });
  for (var i = 0; i < nextNodeList.length; i++) {
    var nextNodeObj = nextNodeList[i];
    var isLeaf =
      GraphUtil.getNextNodeId(nextNodeObj["id"], _curEdgeList).length === 0;
    if (statusList.indexOf(nextNodeObj["group"]) >= 0) {
      if (includingLeaf || !isLeaf) {
        matchedNodeList.push(nextNodeObj);
      }
    }
  }
  if (matchedNodeList.length > 0 || nextNodeIdList.length === 0) {
    return matchedNodeList;
  } else {
    return this.recursiveFindStartPoint(
      nextNodeIdList,
      _curNodeList,
      _curEdgeList,
      statusList,
      false,
      includingLeaf
    );
  }
};
//view
//need to refactor
GraphView.prototype.getStartPoint = function (_curNodeList, _curEdgeList) {
  var searchStatusDict = this.graphDataSource.searchStatus;

  // combine into one for loop
  var correctList = _curNodeList.filter(function (node) {
    return searchStatusDict["learned"].indexOf(node["group"]) !== -1;
  });
  var wrongList = _curNodeList.filter(function (node) {
    return searchStatusDict["not_learned"].indexOf(node["group"]) !== -1;
  });
  var notSureList = _curNodeList.filter(function (node) {
    return searchStatusDict["not_sure"].indexOf(node["group"]) !== -1;
  });
  if (
    correctList.length === 0 &&
    wrongList.length === 0 &&
    notSureList.length === 0
  ) {
    $("#startPointText")[0].innerText = "沒有資料。";
    return;
  }

  // initialize the list
  var startPointIdList = [];
  var startPointList = [];
  var startPointViewList = [];
  // If the information is not enough to decide the start point, we set the start point to the begin of the cg
  if (
    correctList.length === 0 &&
    wrongList.length === 0 &&
    notSureList.length !== 0
  ) {
    var startNotSureNodeIdList = GraphUtil.getStartNode(
      notSureList,
      _curEdgeList
    ).concat(GraphUtil.getSingleNode(notSureList, _curEdgeList));
    for (var s_id = 0; s_id < startNotSureNodeIdList.length; s_id++) {
      var startNodeId = startNotSureNodeIdList[s_id];
      var startNode = GraphUtil.getNodeById(startNodeId, notSureList);
      var sameCgNodeList = _curNodeList.filter(function (node) {
        return (
          node["cg"] === startNode["cg"] &&
          searchStatusDict["learned"]
            .concat(["guessO"])
            .indexOf(node["group"]) === -1
        );
      });
      var startOfCgNodeIdList = GraphUtil.getStartNode(
        sameCgNodeList,
        _curEdgeList
      ).concat(GraphUtil.getSingleNode(sameCgNodeList, _curEdgeList));
      startPointIdList = startPointIdList.concat(startOfCgNodeIdList);
      startPointList = startPointIdList.map(function (node_id) {
        return GraphUtil.getNodeById(node_id, sameCgNodeList);
      });

      startPointViewList.push({
        type: "not_enough",
        notLearnedPointName: notSureList[0]["id"],
        startSection: startOfCgNodeIdList,
      });
    }
  } else if (wrongList.length !== 0) {
    // need to refactor
    // in this case, we should find the head of the chapter of the cg
    var startNodeIdList = GraphUtil.getStartNode(_curNodeList, _curEdgeList);
    startNodeIdList = startNodeIdList.concat(
      GraphUtil.getSingleNode(_curNodeList, _curEdgeList)
    );
    startPointListTmp = this.recursiveFindStartPoint(
      startNodeIdList,
      _curNodeList,
      _curEdgeList,
      searchStatusDict["not_learned"],
      true,
      false
    );
    if (startPointListTmp.length === 0) {
      startPointListTmp = this.recursiveFindStartPoint(
        startNodeIdList,
        _curNodeList,
        _curEdgeList,
        searchStatusDict["not_learned"],
        true,
        true
      );
    }
    for (var s_id = 0; s_id < startPointListTmp.length; s_id++) {
      var startPointTmp = startPointListTmp[s_id];

      var sameCgNodeList = _curNodeList.filter(function (node) {
        return (
          node["cg"] === startPointTmp["cg"] &&
          searchStatusDict["learned"].indexOf(node["group"]) === -1
        );
      });
      var startOfCgNodeIdList = GraphUtil.getStartNode(
        sameCgNodeList,
        _curEdgeList
      ).concat(GraphUtil.getSingleNode(sameCgNodeList, _curEdgeList));
      for (var i = 0; i < startOfCgNodeIdList.length; i++) {
        var startOfCgNode = GraphUtil.getNodeById(
          startOfCgNodeIdList[i],
          sameCgNodeList
        );

        var chapterName = startOfCgNode["id"].split("_")[0];
        var sameChapterNodeList = _curNodeList.filter(function (node) {
          return (
            node["id"].split("_")[0] === chapterName &&
            searchStatusDict["learned"]
              .concat(["guessO"])
              .indexOf(node["group"]) === -1
          );
        });
        var startOfChapterNodeIdList = GraphUtil.getStartNode(
          sameChapterNodeList,
          _curEdgeList
        );
        if (startOfChapterNodeIdList.length === 0) {
          startOfChapterNodeIdList = GraphUtil.getSingleNode(
            sameChapterNodeList,
            _curEdgeList
          ); ////////////// need it?
        }
        startPointIdList = startPointIdList.concat(startOfChapterNodeIdList);
        startPointList = startPointIdList.map(function (node_id) {
          return GraphUtil.getNodeById(node_id, _curNodeList); //sameChapterNodeList)
        });

        startPointViewList.push({
          type: "not_learned",
          notLearnedPointName: startPointTmp["id"],
          startSection: startOfChapterNodeIdList,
        });
      }
    }
  }
  if (startPointList.length === 0) {
    $("#startPointText")[0].innerText = "沒有推薦的起始點。";
  } else {
    var startPointNameList = startPointList.map(function (node) {
      return node["name"].replace("\n", " ");
    });
    $("#startPointText")[0].innerText =
      "推薦起始點為：" + startPointNameList.join("、") + "。";
  }
  return startPointViewList;
};
// use handlebar to improve
GraphView.prototype.updateStarPointView = function (startPointViewList) {
  var self = this;
  var createLinkElementText = function (relateLink, text) {
    return (
      '<a target="_blank" href="https://www.junyiacademy.org/' +
      relateLink +
      '">' +
      text +
      "</a>"
    );
  };
  var createSectionElement = function (nodeId, additionalClassName) {
    // maybe modify to nodeIdList
    $("#recommend-container").append(
      '<div class="recommendBlockContainer" id="' +
        nodeId +
        '-container"></div>'
    );
    var containerSelector = "#" + nodeId + "-container";
    if (additionalClassName) {
      $(containerSelector).addClass(additionalClassName);
    }
    var linkElementText = createLinkElementText(
      this.graphDataSource.getChapterId(nodeId),
      nodeId
    );
    if (additionalClassName === "startPoint") {
      linkElementText = "建議起始點：" + linkElementText;
    } else if (additionalClassName === "endPoint") {
      linkElementText = "學生尚未學會：" + linkElementText;
    } else if (additionalClassName === "prevPoint") {
      linkElementText = "起始點的先備：" + linkElementText;
    } else if (additionalClassName === "nextPoint") {
      linkElementText = "可以繼續學：" + linkElementText;
    }
    $(containerSelector).append(
      '<div class="recommendBlock">' + linkElementText + "</div>"
    );
    var exerciseList = self.graphDataSource.getExBySection(nodeId);
    var exerciseContent = "";
    var learnedTime = 0;
    var contentList = [];
    for (var ex_idx = 0; ex_idx < exerciseList.length; ex_idx++) {
      var exercise = exerciseList[ex_idx];
      var contentId = exercise["content_id"];
      if (contentList.indexOf(contentId) === -1) {
        learnedTime += this.graphDataSource.getLearnedTime(contentId);
        exerciseContent +=
          "<div>" +
          createLinkElementText(
            "exercise/" + contentId,
            exercise["content_title"]
          ) +
          "</div>";
        contentList.push(contentId);
      }
    }
    var learnedMin = Math.ceil(learnedTime / 60);
    //var learnedSec = learnedTime - learnedMin * 60;
    var learnedTimeText = learnedMin + " 分 "; // + learnedSec + " 秒";
    $(containerSelector).append(
      '<div class="recommendExercise" id="' +
        nodeId +
        '-recommendExercise">' +
        "<div>平均達到等級一時間：" +
        learnedTimeText +
        "</div>" +
        "<hr />" +
        exerciseContent +
        "</div>"
    );
    //var containerSelectorElement = getElementById()
    $(containerSelector).hover(
      function () {
        this.lastElementChild.setAttribute("style", "display:block;");
      },
      function () {
        this.lastElementChild.setAttribute("style", "display:none;");
      }
    );
  };

  $("#recommend-container")[0].innerHTML = "";
  if (!startPointViewList) {
    if (!this.graphDataSource.curEmail) {
      $("#recommend-container").append(
        '<div style="padding-left: 20px;">請先選擇學生，即可看到推薦起始點嘍。</div>'
      );
    } else {
      $("#recommend-container").append(
        '<div style="padding-left: 20px;">目前資料不足，無法建議起始點。</div>'
      );
    }
    return;
  }
  console.log(startPointViewList);
  if (startPointViewList.length > 0) {
    for (var i = 0; i < startPointViewList.length; i++) {
      startPointViewObj = startPointViewList[i];

      $("#recommend-container").append(
        '<div style="padding-left: 20px;">學生於「' +
          startPointViewObj["notLearnedPointName"].split("_")[1] +
          "」沒學會可以參考以下學習路徑開始學習</div>"
      );
      $("#recommend-container").append(
        '<h4 style="padding-left: 20px;">學習「' +
          startPointViewObj["notLearnedPointName"].split("_")[1] +
          "」建議路徑</h4>"
      );
      for (var j = 0; j < startPointViewObj["startSection"].length; j++) {
        var sectionName = startPointViewObj["startSection"][j];
        $("#recommend-container").append(
          "<h5>從「" + sectionName + "」開始學習</h5>"
        );
        var path = GraphUtil.getPath(
          sectionName,
          startPointViewObj["notLearnedPointName"],
          this.graphDataSource.curEdgeList
        );

        var prevNodeIdList = GraphUtil.getPrevNodeId(
          path[0],
          this.graphDataSource.curEdgeList
        );
        if (prevNodeIdList.length > 0) {
          if (
            this.graphDataSource.getExBySection(prevNodeIdList[0]).length === 0
          ) {
            prevNodeIdList = GraphUtil.getPrevNodeId(
              prevNodeIdList[0],
              this.graphDataSource.curEdgeList
            );
          }
          if (prevNodeIdList.length > 0) {
            createSectionElement(prevNodeIdList[0], "prevPoint");
            $("#recommend-container").append(
              '<div class="recommendArrow">↑</div>'
            );
          }
        }
        for (var pathIdx = 0; pathIdx < path.length; pathIdx++) {
          var nodeId = path[pathIdx];
          if (pathIdx === path.length - 1) {
            createSectionElement(nodeId, "endPoint");
          } else if (pathIdx === 0) {
            createSectionElement(nodeId, "startPoint");
            $("#recommend-container").append(
              '<div class="recommendArrow">↓</div>'
            );
          } else {
            createSectionElement(nodeId);
            $("#recommend-container").append(
              '<div class="recommendArrow">↓</div>'
            );
          }
        }
        var nextNodeIdList = GraphUtil.getNextNodeId(
          path[path.length - 1],
          this.graphDataSource.curEdgeList
        );
        if (nextNodeIdList.length > 0) {
          $("#recommend-container").append(
            '<div class="recommendArrow">↓</div>'
          );
          createSectionElement(nextNodeIdList[0], "nextPoint");
        }
      }
    }
  } else {
    $("#recommend-container").append(
      '<div style="padding-left: 20px;">現階段，此學生分數概念已經學到目前的學習階段嘍！</div>'
    );
  }
};
