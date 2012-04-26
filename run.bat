@echo off
set JAVA_HOME=%JAVA_HOME%
set ANT_HOME=.\ant
set PATH=%PATH%;%ANT_HOME%\bin
ant -buildfile build.xml -l build.log
