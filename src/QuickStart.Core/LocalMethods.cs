using System;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
namespace QuickStart.Core
{
    public class LocalMethods
    {
        public async Task<object> GetAppDomainDirectory(dynamic input)
        {
            return AppDomain.CurrentDomain.BaseDirectory;
        }

        public async Task<object> GetCurrentTime(dynamic input)
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        }

        public async Task<object> UseDynamicInput(dynamic input)
        {
            return $".NET Core welcomes {input}";
        }

        
        public async Task<object> ExecuteCode(string code)
        {
            Task<ScriptState<object>> scriptState = null;
            scriptState = scriptState == null ? CSharpScript.RunAsync(code) : scriptState.Result.ContinueWithAsync(code);
            return (await scriptState).ReturnValue;
        }
    }
}
