#!groovy

@Library('github.com/red-panda-ci/jenkins-pipeline-library@v2.5.0') _

// Initialize global config
cfg = jplConfig('repogen', 'backend', '', [email:'redpandaci+repogen@gmail.com'])

pipeline {
    agent none

    stages {
        stage ('Initialize') {
            agent { label 'docker' }
            steps  {
                jplStart(cfg)
            }
        }
        stage ('Build') {
            agent { label 'docker' }
            steps {
                echo "Build mock"
            }
        }
        stage ('Test') {
            agent { label 'docker' }
            when { expression { (env.BRANCH_NAME == 'develop') || env.BRANCH_NAME.startsWith('PR-') || env.BRANCH_NAME.startsWith('release/v') } }
            steps  {
                sh 'bin/test.sh'
            }
        }
        stage ('Release confirm') {
            when { branch 'release/v*' }
            steps {
                jplPromoteBuild(cfg)
            }
        }
        stage ('Release finish') {
            agent { label 'docker' }
            when { expression { env.BRANCH_NAME.startsWith('release/v') && cfg.promoteBuild.enabled } }
            steps {
                jplCloseRelease(cfg)
            }
        }
        stage ('PR Clean') {
            agent { label 'docker' }
            when { branch 'PR-*' }
            steps {
                deleteDir()
            }
        }
    }

    post {
        always {
            jplPostBuild(cfg)
        }
    }

    options {
        timestamps()
        ansiColor('xterm')
        buildDiscarder(logRotator(artifactNumToKeepStr: '20',artifactDaysToKeepStr: '30'))
        disableConcurrentBuilds()
        skipDefaultCheckout()
        timeout(time: 1, unit: 'DAYS')
    }
}
