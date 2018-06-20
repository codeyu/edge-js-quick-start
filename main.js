const path = require('path');
var version = process.argv[2];
var namespace = 'QuickStart.' + version.charAt(0).toUpperCase() + version.substr(1);
if(version === 'core') version = 'coreapp';

const baseNetAppPath = path.join(__dirname, '/src/'+ namespace +'/bin/Debug/net'+ version +'2.0');

process.env.EDGE_USE_CORECLR = 1;
if(version !== 'standard')
    process.env.EDGE_APP_ROOT = baseNetAppPath;

var edge = require('edge-js');

var baseDll = path.join(baseNetAppPath, namespace + '.dll');
console.log(baseDll);
var localTypeName = namespace + '.LocalMethods';
var externalTypeName = namespace + '.ExternalMethods';

var getAppDomainDirectory = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'GetAppDomainDirectory'
});

var getCurrentTime = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'GetCurrentTime'
});

var useDynamicInput = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'UseDynamicInput'
});
var executeCode = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'ExecuteCode'
});
var getPerson = edge.func({
    assemblyFile: baseDll,
    typeName: externalTypeName,
    methodName: 'GetPersonInfo'
});

console.log('### Calling local methods from ' + namespace +'.dll')
console.log();
getAppDomainDirectory('', function(error, result) {
    if (error) throw error;
    console.log(localTypeName + '.GetAppDomainDirectory');
    console.log(result);
    console.log();
});

getCurrentTime('', function(error, result) {
    if (error) throw error;
    console.log(localTypeName + '.GetCurrentTime');
    console.log(result);
    console.log();
});

useDynamicInput('Node.Js', function(error, result) {
    if (error) throw error;
    console.log(localTypeName + '.UseDynamicInput');
    console.log(result);
    console.log();
});

console.log();
console.log('### Calling external library methods using '+ namespace +'.dll wrapper');
console.log();
getPerson('', function(error, result) {
    if (error) throw error;
    console.log(externalTypeName + '.GetPersonInfo');
    console.log(result);
});

executeCode(getSelectedText(), function (error, result) { 
    if(error) throw error;
    console.log(result); 
});

        
function getSelectedText() {
    
    selectedText = heredoc(function(){/*
        public class Hello
        {
            public string HelloWorld()
            {
                return "Hello World";
            }
        }
        new Hello().HelloWorld()
 */});
    console.log(selectedText);
    return selectedText;

}
function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}
