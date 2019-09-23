@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\polymer-bundler\lib\bin\polymer-bundler.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\polymer-bundler\lib\bin\polymer-bundler.js" %*
)