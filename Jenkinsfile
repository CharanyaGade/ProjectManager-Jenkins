pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('ProjectReact') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Tomcat\\webapps\\reactprojectapi" (
                    rmdir /S /Q "C:\\Tomcat\\webapps\\reactprojectapi"
                )
                mkdir "C:\\Tomcat\\webapps\\reactprojectapi"
                xcopy /E /I /Y "ProjectReact\\build\\*" "C:\\Tomcat\\webapps\\reactprojectapi\\"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('ProjectSpringBoot') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }
        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
    steps {
        bat '''
        if exist "C:\\Tomcat\\webapps\\springbootprojectapi.war" (
            del /Q "C:\\Tomcat\\webapps\\springbootprojectapi.war"
        )
        if exist "C:\\Tomcat\\webapps\\springbootprojectapi" (
            rmdir /S /Q "C:\\Tomcat\\webapps\\springbootprojectapi"
        )
        copy "ProjectSpringBoot\\target\\springbootprojectapi.war" "C:\\Tomcat\\webapps\\springbootprojectapi.war"
        '''
    }
}

 }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
