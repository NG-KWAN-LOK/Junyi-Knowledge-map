var GraphUtil = {

    fraction_cg: ["3-n-11", "4-n-07", "4-n-08", "4-n-09", "4-n-10",
                  "5-n-06", "5-n-07", "5-n-08", "5-n-09", "5-n-13",
                  "6-n-03", "6-n-04", "6-n-05", "6-n-09", "6-n-10"],
    notvalidWeight: [
        [         0,          0,          0,          0,          0, 0.12568306, 0.15766739, 0.34773218, 0.25161987, 0.15658747, 0.39441341, 0.29273743, 0.11396648,  0.1575419, 0.18435754,],
        [         0,          0, 0.05201178, 0.13735178, 0.11688312, 0.14920949, 0.14130435, 0.19960474,  0.1916996, 0.32509881, 0.02826511, 0.09259259, 0.00779727, 0.10721248, 0.05354752,],
        [         0, 0.17369971,          0, 0.06324111, 0.21478521, 0.07509881, 0.06818182, 0.09486166, 0.09782609, 0.16205534, 0.13060429, 0.35575049, 0.06725146, 0.42202729, 0.20749665,],
        [         0, 0.35474308, 0.08300395,         0., 0.27173913, 0.23418972, 0.22529644, 0.30039526, 0.28162055, 0.49901186,          0,          0,          0,          0,          0,],
        [         0,  0.1978022,  0.1028971, 0.16304348,         0.,  0.1916996,  0.1798419, 0.24901186, 0.23418972, 0.41501976,  0.1010101, 0.24545455, 0.03535354, 0.29292929, 0.14486639,],
        [0.02076503, 0.33794466, 0.09288538,  0.2055336, 0.27173913,         0., 0.19763514, 0.38344595, 0.30658784, 0.31883446, 0.52318393, 0.40108192, 0.16151468, 0.20401855, 0.23879444,],
        [ 0.0237581, 0.32608696, 0.08596838, 0.19268775, 0.25592885, 0.16089527,         0., 0.35340532, 0.27574751, 0.31436877, 0.47976012, 0.37331334, 0.13568216,  0.1934033, 0.22563718,],
        [ 0.0075594, 0.26284585, 0.05731225, 0.14624506, 0.20355731, 0.09839527, 0.10548173,         0., 0.15033223, 0.20182724, 0.19415292, 0.13793103, 0.05922039, 0.05997001, 0.08170915,],
        [0.02159827, 0.28458498, 0.08399209, 0.15711462, 0.21837945, 0.13302365, 0.13870432, 0.26121262,         0., 0.24335548, 0.33208396, 0.24137931, 0.10194903, 0.13418291, 0.15517241,],
        [0.02051836, 0.09288538, 0.02272727, 0.04940711, 0.07411067, 0.10726351, 0.13496678, 0.27034884, 0.20099668,         0., 0.46326837, 0.34632684, 0.13718141, 0.17841079, 0.22113943,],
        [0.00782123, 0.06335283, 0.07212476,          0, 0.12222222, 0.05255023, 0.06521739, 0.12743628, 0.09295352, 0.05997001,         0., 0.10639938, 0.02235929,  0.0844256, 0.07559395,],
        [0.01452514, 0.14230019, 0.13840156,          0, 0.21515152, 0.08423493,  0.1131934, 0.22563718, 0.15667166, 0.09745127, 0.16499614,          0, 0.04548959, 0.16576715, 0.12440605,],
        [0.00782123, 0.04678363, 0.05945419,          0, 0.0979798,  0.06877898, 0.06746627, 0.17916042, 0.12743628, 0.08245877, 0.11063994, 0.11295297,         0., 0.08211257, 0.08509719,],
        [0.00893855, 0.09356725, 0.10233918,          0, 0.15757576, 0.05332303, 0.06746627, 0.15292354, 0.11769115, 0.06146927, 0.10717039,  0.1464919, 0.02698535,          0, 0.09287257,],
        [0.01899441, 0.18206158, 0.18607764,          0, 0.30098453, 0.17928903, 0.22038981, 0.42428786, 0.32533733, 0.22713643, 0.31274298, 0.35680346, 0.10410367, 0.27343413,          0,]],

    setLevel: function(_curNodeList, _curEdgeList) {
        var startNodeIdList = this.getStartNode(_curNodeList, _curEdgeList)
        var singleNodeIdList = this.getSingleNode(_curNodeList, _curEdgeList)

        function recursiveSetLevel(_curStartIdList, _curNodeList, _curEdgeList, _curLevel) {
            var nextLevelIdList = [];
            for (var i = 0; i < _curNodeList.length; i++) {
                var _curNode = _curNodeList[i];
                if (_curStartIdList.indexOf(_curNode['id']) !== -1) {
                    if (!_curNodeList[i]['level']) {
                        console.log("no level set level " + _curLevel)
                        _curNodeList[i]['level'] = _curLevel;
                        nextLevelIdList = nextLevelIdList.concat(_curEdgeList.reduce(function (result, edge) {
                            if (edge['from'] === _curNode['id']) {
                                result.push(edge['to'])
                            }
                            return result
                        }, []));
                    }
                }
            }
            if (nextLevelIdList.length > 0) {
                _curNodeList = recursiveSetLevel(nextLevelIdList, _curNodeList, _curEdgeList, _curLevel + 1)
            }
            return _curNodeList
        }
        _curNodeList = recursiveSetLevel(startNodeIdList.concat(singleNodeIdList), _curNodeList, _curEdgeList, 0)
        return _curNodeList
    },
    updateEdgesWeight: function(edges_list){
        for(var i=0; i < edges_list.length; i++){
            edge = edges_list[i];
            from = edge['from'];
            to = edge['to'];
            ind1 = this.fraction_cg.indexOf(from);
            ind2 = this.fraction_cg.indexOf(to);
            if (ind1>=0 && ind2>=0){
                weight = this.notvalidWeight[ind1][ind2];
                if (weight > 0){
                    edges_list[i]['width'] = (1-weight) * 8;
                    //edges_list[i]['label'] = statusStrArray[ind1][ind2]; // temp
                }
            }
        }
        return edges_list
    },
    filterEdgeByNodeList: function(_curNodeList, _curEdgeList){
        var _curNodeIdList = _curNodeList.map(function (node) {
            return node['id']
        });
        var _curEdgeList = _curEdgeList.filter(function (edge) {
            return _curNodeIdList.indexOf(edge['from']) !== -1 && _curNodeIdList.indexOf(edge['to']) !== -1
        });
        return _curEdgeList
    },
    getStartNode: function(_curNodeList, _curEdgeList) {
        _curEdgeList = this.filterEdgeByNodeList(_curNodeList, _curEdgeList);

        var startNodeList = [];
        for (var i = 0; i < _curEdgeList.length; i++) {
            var edgeObj = _curEdgeList[i];
            var fromNode = edgeObj['from'];
            var filterEdgeList = _curEdgeList.filter(function (edge) {
                return edge['to'] === fromNode
            });
            if (filterEdgeList.length === 0) {
                if (startNodeList.indexOf(fromNode) === -1) {
                    startNodeList.push(fromNode);
                }
            }
        }
        return startNodeList
    },
    getEndNode: function(_curNodeList, _curEdgeList) {
        var endNodeIdList = [];
        for (var i = 0; i < _curEdgeList.length; i++) {
            var edgeObj = _curEdgeList[i];
            var toNode = edgeObj['to'];
            var filterEdgeList = _curEdgeList.filter(function (edge) {
                return edge['from'] === toNode
            });
            if (filterEdgeList.length === 0) {
                if (endNodeIdList.indexOf(toNode) === -1) {
                    endNodeIdList.push(toNode);
                }
            }
        }
        return endNodeIdList
    },
    getNextNodeId: function(_nodeId, _curEdgeList){
        var nextNodeIdList = [];
        for (var i = 0; i < _curEdgeList.length; i++) {
            var edgeObj = _curEdgeList[i];
            if (edgeObj['from'] === _nodeId){
                var toNodeId = edgeObj['to'];
                if(nextNodeIdList.indexOf(toNodeId) === -1){
                    nextNodeIdList.push(toNodeId);
                }
            }
        }
        return nextNodeIdList
    },
    getPrevNodeId: function (_nodeId, _curEdgeList) {
        var fromNodeIdList = [];
        for (var i = 0; i < _curEdgeList.length; i++) {
            var edgeObj = _curEdgeList[i];
            if (edgeObj['to'] === _nodeId) {
                var fromNodeId = edgeObj['from'];
                if (fromNodeIdList.indexOf(fromNodeId) === -1) {
                    fromNodeIdList.push(fromNodeId);
                }
            }
        }
        return fromNodeIdList
    },
    getSingleNode: function(_curNodeList, _curEdgeList) {
        _curEdgeList = this.filterEdgeByNodeList(_curNodeList, _curEdgeList);
        // handle the lonely island
        var singleNodeIdList = [];
        for (var i = 0; i < _curNodeList.length; i++) {
            var nodeObj = _curNodeList[i];
            var nodeId = nodeObj['id'];
            var filterEdgeList = _curEdgeList.filter(function (edge) {
                return edge['from'] === nodeId || edge['to'] === nodeId
            });
            if (filterEdgeList.length === 0) {
                if (singleNodeIdList.indexOf(nodeId) === -1) {
                    singleNodeIdList.push(nodeId);
                }
            }
        }
        return singleNodeIdList
    },
    getNodeById: function(nodeId, _curNodeList) {
        var matchNode = _curNodeList.filter(function (node) {
            return node['id'] === nodeId
        });
        if (matchNode.length === 0) {
            return {}
        } else {
            return matchNode[0]
        }
    },
    getPath: function(startNodeId, endNodeId, _curEdgeList){
        var self = this;
        var recursiveGetPath = function(curNodeId, endNodeId, _curEdgeList, path){
            var nextNodeIdList = self.getNextNodeId(curNodeId, _curEdgeList);
            if(nextNodeIdList.length === 0){
                return []
            }
            for(var i = 0; i< nextNodeIdList.length; i++){
                var nextNodeId = nextNodeIdList[i];
                if(nextNodeId === endNodeId){
                    path.push(nextNodeId);
                    return path
                } else {
                    path = path || recursiveGetPath(nextNodeId, endNodeId, _curEdgeList, path);
                    if(path){
                        path = [nextNodeId].concat(path);
                        return path
                    }
                }
            }
            return path
        };
        if(startNodeId === endNodeId){
            return [startNodeId]
        } else {
            var path = recursiveGetPath(startNodeId, endNodeId, _curEdgeList, []);
            if(path){
                return [startNodeId].concat(path)
            } else {
                return false
            }
        }
    },

    maxStringArray: function (strArray) {
        return strArray.reduce(function (a, b) {
            if (a > b) return a
            else return b
        })
    },
}
