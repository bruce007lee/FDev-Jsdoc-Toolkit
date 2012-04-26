export JAVA_HOME=${JAVA_HOME}
export ANT_HOME=./ant
export PATH=${PATH}:${ANT_HOME}/bin
ant -buildfile build.xml -l build.log
