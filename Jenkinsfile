#!groovy

@Library("workflowlibs@1.8.0") _

pipeline {

    options {
        ansiColor colorMapName: 'XTerm'
        timestamps()
    }

    agent any

    stages {

        stage('Checkout Global Library') {

            steps {

                script{

                    globalBootstrap {

                        libraryName   = "cellsworkflowlibs"
                        libraryBranch = "1.1.0"

                        entrypointParams = [
                            type            : "cellsApp",
                            buildConfigs    : [config1:[config:'dev', build:'novulcanize']],
                            deployS3        : true
                        ]
                    }
                }
            }
        }
    }
}