(function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],b=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,d=typeof location!="undefined"&&location.href,e=[];define("text",[],function(){var f,g,h;typeof window!="undefined"&&window.navigator&&window.document?g=function(a,b){var c=f.createXhr();c.open("GET",a,!0),c.onreadystatechange=function(a){c.readyState===4&&b(c.responseText)},c.send(null)}:typeof process!="undefined"&&process.versions&&!!process.versions.node?(h=require.nodeRequire("fs"),g=function(a,b){b(h.readFileSync(a,"utf8"))}):typeof Packages!="undefined"&&(g=function(a,b){var c="utf-8",d=new java.io.File(a),e=java.lang.System.getProperty("line.separator"),f=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d),c)),g,h,i="";try{g=new java.lang.StringBuffer,h=f.readLine(),h&&h.length()&&h.charAt(0)===65279&&(h=h.substring(1)),g.append(h);while((h=f.readLine())!==null)g.append(e),g.append(h);i=String(g.toString())}finally{f.close()}b(i)}),f={version:"0.26.0",strip:function(a){if(a){a=a.replace(b,"");var d=a.match(c);d&&(a=d[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var b,c,d;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(c=0;c<3;c++){d=a[c];try{b=new ActiveXObject(d)}catch(e){}if(b){a=[d];break}}if(!b)throw new Error("createXhr(): XMLHttpRequest not available");return b},get:g,parseName:function(a){var b=!1,c=a.indexOf("."),d=a.substring(0,c),e=a.substring(c+1,a.length);c=e.indexOf("!"),c!==-1&&(b=e.substring(c+1,e.length),b=b==="strip",e=e.substring(0,c));return{moduleName:d,ext:e,strip:b}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,canUseXhr:function(a,b,c,d){var e=f.xdRegExp.exec(a),g,h,i;if(!e)return!0;g=e[2],h=e[3],h=h.split(":"),i=h[1],h=h[0];return(!g||g===b)&&(!h||h===c)&&(!i&&!h||i===d)},finishLoad:function(a,b,c,d,g){c=b?f.strip(c):c,g.isBuild&&g.inlineText&&(e[a]=c),d(c)},load:function(a,b,c,e){var g=f.parseName(a),h=g.moduleName+"."+g.ext,i=b.toUrl(h);!d||f.canUseXhr(i)?f.get(i,function(b){f.finishLoad(a,g.strip,b,c,e)}):b([h],function(a){f.finishLoad(g.moduleName+"."+g.ext,g.strip,a,c,e)})},write:function(a,b,c,d){if(b in e){var g=f.jsEscape(e[b]);c("define('"+a+"!"+b+"', function () { return '"+g+"';});\n")}},writeFile:function(a,b,c,d,e){var g=f.parseName(b),h=g.moduleName+"."+g.ext,i=c.toUrl(g.moduleName+"."+g.ext)+".js";f.load(h,c,function(b){f.write(a,h,function(a){d(i,a)},e)},e)}};return f})})(),define("text!Position/Summary/table.html",function(){return'<table class="positions">\n    <thead>\n        <tr>\n            <th>\n                Symbol\n            </th>\n            <th class="shares">\n                Shares\n            </th>\n            <th>\n                Last\n            </th>\n            <th class="cost-basis">\n                Cost Basis\n            </th>\n            <th class="market-value">\n                Market Value\n            </th>\n            <th class="gain-loss">\n                Gain/Loss %\n            </th>\n            <th>\n                Actions\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n    \t\n    </tbody>\n</table>\n'}),define("text!Position/Summary/row.html",function(){return'<tr data-symbol="${symbol}">\n    <td>${symbol}</td>\n    <td class="shares">${shares}</td>\n    <td class="price">\n        $85.07\n    </td>\n    <td class="cost-basis">\n        $1,900.22\n    </td>\n    <td class="market-value">\n        $26,803.86\n    </td>\n    <td class="gain-loss">\n        176.0%\n    </td>\n    <td>\n    </td>\n</tr>'}),define("Position/Summary/summaryView",["text!./table.html","text!./row.html"],function(a,b){var c="#,##0.00",d=Backbone.View.extend({name:"Position",events:{"click tr":"rowClicked"},initialize:function(b){var c=b.bus;this.bus=c,this.selectedRowEl=$(),this.rows={},this.table=$(a),$(this.el).append(this.table),c.pub("get-stock-data",this.loadStockData.bind(this)),c.sub("symbol-updated",this.symbolUpdated.bind(this)),c.sub("symbol-selected",this.symbolSelected.bind(this))},formatPrice:function(a){return"$"+$.format.number(a,c)},loadStockData:function(a){var d=this.rows,e=this.table.find("tbody"),f=this.formatPrice;Object.keys(a).forEach(function(g){var h=a[g],i=$.tmpl(b,{symbol:h.symbol,price:f(h.price,c),shares:h.shares}),j=i.find(".price");e.append(i),d[g]={el:i,update:function(a){j.text(f(a.price))}}})},symbolUpdated:function(a){var b=a.symbol,c;this.rows.hasOwnProperty(b)&&(c=this.rows[b])&&c.update(a)},rowClicked:function(a){var b=$(a.currentTarget),c=b.attr("data-symbol");this.bus.pub("symbol-selected",{symbol:c})},symbolSelected:function(a){var b=this.rows[a.symbol];b&&b.el&&(this.selectedRowEl.removeClass("selected"),this.selectedRowEl=b.el,this.selectedRowEl.addClass("selected"))}});return d}),define("Position/PieChart/pieChartView",[],function(){var a=Backbone.View.extend({title:"Pie Chart",initialize:function(a){var b=$("<div>").addClass("chart");$(this.el).append(b),a.bus.pub("get-stock-data",function(a){var c=Object.keys(a).map(function(b){var c=a[b];return{label:b,data:c.shares}});$.plot(b,c,{series:{pie:{show:!0,radius:1,label:{radius:.75,formatter:function(a,b){return'<div style="color: white; font-size: 10px;">'+a+"</div>"}}}},legend:{show:!1}})})},render:function(){var a=["CSCO","MSFT","APPL","GOOG","ORCL"],b=[],c;for(c=0;c<a.length;c++)b.push({label:a[c],data:Math.floor(Math.random()*100)+1});$.plot(this.el,b,{series:{pie:{show:!0}},legend:{show:!1}})}});return a}),define("Position/positionModule",["./Summary/summaryView","./PieChart/pieChartView"],function(a,b){return{views:{main:[a],research:[b]}}}),define("text!Watch/WatchList/table.html",function(){return"<table>\n    <thead>\n        <tr>\n            <th>Symbol</th>\n            <th>Last</th>\n            <th>Actions</th>\n        </tr>\n    </thead>\n    <tbody>\n    \t\n    </tbody>\n</table>\n"}),define("text!Watch/WatchList/row.html",function(){return'<tr data-symbol="${symbol}">\n    <td>${symbol}</td>\n    <td class="price"></td>\n    <td>\n\t\t<a href="#" data-command="remove">X</a>\n    </td>\n</tr>'}),define("Watch/WatchList/watchListView",["text!./table.html","text!./row.html"],function(a,b){var c=Backbone.View.extend({name:"Watch List",events:{"click a[data-command=remove]:":"removeClicked"},initialize:function(b){var c=$(this.el),d=$(a);c.append(d),this.watches={},this.bus=b.bus,this.tableEl=d,this.bus.sub("add-symbol-watch",this.addSymbolWatch.bind(this)),this.bus.sub("symbol-updated",this.symbolUpdated.bind(this))},addSymbolWatch:function(a){var c=a.symbol,d,e,f;this.watches.hasOwnProperty(c)||(d=$.tmpl(b,{symbol:a.symbol}),this.tableEl.find("tbody").append(d),e=d.find(".price"),f={el:d,update:function(a){var b="$"+$.format.number(a.price,"#,##0.00");e.text(b)},remove:function(){d.remove()}},this.watches[c]=f,this.trigger("focus"))},symbolUpdated:function(a){var b=a.symbol,c;this.watches.hasOwnProperty(b)&&(c=this.watches[b])&&c.update(a)},removeClicked:function(a){var b=$(a.target).parents("tr[data-symbol]"),c=b.attr("data-symbol"),d=this.watches[c];a.preventDefault();!d||(d.remove(),delete this.watches[c])}});return c}),define("text!Watch/AddWatch/addWatchView.html",function(){return'<div>\n\t<form>\n\t\t<input class="add-symbol" type="text" placeholder="Add to Watch List" />\n\t</form>\n</div>'}),define("Watch/AddWatch/addWatchView",["text!./addWatchView.html"],function(a){var b=/^\w+$/,c=Backbone.View.extend({events:{"submit form":"addWatchSubmitted"},initialize:function(b){$.tmpl(a).appendTo(this.el),this.bus=b.bus,this.symbolText=this.$(".add-symbol")},addWatchSubmitted:function(a){var c;a.preventDefault(),c=this.symbolText.val(),b.exec(c)&&(this.bus.pub("add-symbol-watch",{symbol:c}),this.symbolText.val(""))}});return c}),define("Watch/watchModule",["./WatchList/watchListView","./AddWatch/addWatchView"],function(a,b){return{views:{main:[a],toolbar:[b]}}}),define("text!market/trendLine/trendLineView.html",function(){return'<div>\n\t<h1>Trend Line</h1>\n\t<div class="graph">\n\t</div>\n</div>'}),define("market/trendLine/trendLineView",["text!./trendLineView.html"],function(a){var b=10,c=Backbone.View.extend({title:"History",initialize:function(){var a=this.options.bus,b=$("<div>").addClass("chart");$(this.el).append(b),this.bus=a,this.chartEl=b,a.sub("symbol-selected",this.symbolSelected.bind(this)),a.sub("symbol-updated",this.symbolUpdated.bind(this))},createChart:function(){this.chart=$.plot(this.chartEl,[this.symbolData],{series:{shadowSize:0},yaxis:{},xaxis:{show:!1}})},symbolSelected:function(a){var b=a.symbol;this.symbol=b,this.symbolData=[],this.title=b+" History",this.trigger("title-changed"),this.createChart()},symbolUpdated:function(a){var c=a.symbol,d;c===this.symbol&&(d=(new Date).getTime(),this.symbolData.push([d,a.price]),this.symbolData.length>b&&this.symbolData.splice(0,this.symbolData.length-b),this.chart.setData([this.symbolData]),this.chart.setupGrid(),this.chart.draw())}});return c}),define("market/marketModule",["./trendLine/trendLineView"],function(a){return{views:{research:[a]}}}),define("news/article/newsReaderView",[],function(){function a(a){var b=$("<div>").text(a.date),c=$("<div>").html(a.title),d=$("<a>").attr({href:a.link,target:"_blank",title:a.title});d.append(b).append(c);return $("<li>").append(d)}var b=Backbone.View.extend({title:"News Articles",initialize:function(){var a=this.options.bus,b=$(this.el);b.addClass("news-articles"),this.bus=a,this.newsListEl=$("<ul>").addClass("news").appendTo(b),this.bus.sub("symbol-selected",this.symbolSelected.bind(this))},symbolSelected:function(a){var b=a.symbol;this.bus.pub("get-news-articles",{symbol:b},this.gotNews.bind(this))},gotNews:function(b,c){var d=this.newsListEl;d.children().remove();b||c.forEach(function(b){var c=a(b);d.append(c)})}});return b}),define("news/newsModule",["./article/newsReaderView"],function(a){return{views:{research:[a]}}}),define("modules",["./Position/positionModule","./Watch/watchModule","./market/marketModule","./news/newsModule"],function(a,b,c,d){return{position:a,watch:b,market:c,news:d}}),define("text!Shell/shell.html",function(){return'<div class="shell">\n    <div class="content">\n\t\t<h1><span class="company">CFI</span> StockTrader</h1>\n\t\t<div class="control-bar">\n\t\t    <ul class="screen-list">\n\t\t    </ul>\n\t\t\t<div class="toolbar" data-region="toolbar">\n\t\t\t    \n\t\t\t</div>\n\t\t</div>\n\t\t<div class="screens">\n\n\t\t</div>\n    </div>\n    <div class="sidebar">\n\t\t<div class="header">\n\t        <ul class="icons">\n\t            <li class="chart"><a href="#">Chart</a> </li>\n\t            <li class="pie"><a href="#">Pie</a> </li>\n\t        </ul>\n\t\t</div>\n        <div class="details screen">\n        </div>\n    </div>\n</div>\n'}),define("Shell/tabSwitcher",[],function(){function c(a,b){var c=$("<li>");$("<a>").attr({"data-screen-index":b,href:"#"}).text(a.name).appendTo(c);return c}function b(a){this.headerEl=a.headerEl,this.screenEl=a.screenEl,this.views={},this.initialize()}var a=0;b.prototype={initialize:function(){this.headerEl.delegate("a","click",this.screenClick.bind(this))},add:function(b){var d=a++,e=c(b,d);this.headerEl.append(e);var f=$("<div>").addClass("screen").addClass("hidden").append(b.el).appendTo(this.screenEl);this.views[d]={view:b,el:f},b.bind("focus",this.openView.bind(this,d)),this.currentView||this.openView(0)},screenClick:function(a){var b;a.preventDefault(),b=$(a.target).attr("data-screen-index"),this.openView(b)},openView:function(a){var b=this.views[a];b!==this.currentView&&(this.currentView?(this.currentView.el.addClass("back").removeClass("front"),b.el.addClass("front").removeClass("back").removeClass("hidden")):b.el.removeClass("hidden"),this.currentView=b,this.headerEl.find("li").removeClass("selected"),this.headerEl.find("li a[data-screen-index="+a+"]").parents("li").addClass("selected"))}};return b}),define("Shell/sidebar",[],function(){function a(a){this.el=a.el}a.prototype={add:function(a){var b=$("<h1>").text(a.title),c=$("<div>").addClass("detail-widget").append(b).append(a.el);a.bind("title-changed",function(){b.text(a.title)}),this.el.append(c)}};return a}),define("Shell/shell",["text!./shell.html","./tabSwitcher","./sidebar"],function(a,b,c){function e(e){this.options=e,this.bus=e.bus,this.el=$.tmpl(a).appendTo(e.container);var f=new b({bus:this.bus,headerEl:this.el.find(".control-bar ul"),screenEl:this.el.find(".screens")}),g=this.el.find(".toolbar"),h={main:f,research:new c({bus:this.bus,el:this.el.find(".sidebar .details")}),toolbar:{add:function(a){g.append(a.el)}}};d(e.modules,h,this.bus)}function d(a,b,c){Object.keys(a).forEach(function(d){var e=a[d],f=e.views;Object.keys(f).forEach(function(a){var d=f[a];d.forEach(function(d){var e=new d({bus:c});b[a].add(e)})})})}e.prototype={};return e}),define("Infrastructure/pubsub",[],function(){function b(){this.subscriptions=[]}var a=Array.prototype.slice;b.prototype.sub=function c(a,b){var c=this.subscriptions,d=c[a]||(c[a]=[]);d.push(b);return function(){var a=d.indexOf(b);a>=0&&d.splice(a,1)}},b.prototype.pub=function(b){var c=this.subscriptions,d=c[b]||[],e=a.call(arguments,0).slice(1);d.slice(0).forEach(function(a){a.apply(null,e)})};return b}),define("Infrastructure/stockDataService",[],function(){function b(b){var c=b.bus;c.sub("get-stock-data",function(b){a.emit("get-stocks",function(a){b(a)})}),c.sub("get-news-articles",function(b,c){a.emit("get-news-articles",b,c)}),a.on("symbol-updated",function(a){c.pub("symbol-updated",a)})}var a=io.connect();return b}),require(["modules","Shell/shell","Infrastructure/pubsub","Infrastructure/stockDataService"],function(a,b,c,d){var e=$("#container"),f=new c,g=new d({bus:f}),h=new b({bus:f,container:e,modules:a})}),define("bootstrapper",function(){})