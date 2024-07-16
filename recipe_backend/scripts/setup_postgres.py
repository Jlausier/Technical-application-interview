import psycopg2

# Database configuration
db_name = 'Drink_Roulette'
db_user = 'Jacob'
db_password = 'Feyre+Aria'
db_host = 'localhost'
db_port = '5432'

try:
    # Connect to PostgreSQL as superuser (postgres) to create database and user
    conn = psycopg2.connect(
        dbname='postgres',  # Connecting to default 'postgres' database
        user='postgres',    # PostgreSQL superuser
        password='Feyre+Aria',        
        host=db_host,
        port=db_port
    )

    conn.autocommit = True
    cursor = conn.cursor()

    # Create database
    cursor.execute(f"CREATE DATABASE {db_name};")

    # Close cursor and connection to reconnect to the newly created database
    cursor.close()
    conn.close()

    # Connect to the newly created database with specific user credentials
    conn = psycopg2.connect(
        dbname=db_name,
        user='postgres', 
        password='Feyre+Aria',   
        host=db_host,
        port=db_port
    )
    
    cursor = conn.cursor()

    # Create user and grant privileges
    cursor.execute(f"CREATE USER {db_user} WITH ENCRYPTED PASSWORD '{db_password}';")
    cursor.execute(f"GRANT ALL PRIVILEGES ON DATABASE {db_name} TO {db_user};")

    # Commit changes and close cursor and connection
    conn.commit()
    cursor.close()
    conn.close()

    print(f"Database '{db_name}' and user '{db_user}' created successfully.")

except psycopg2.Error as e:
    print(f"Error: {e}")

finally:
    if conn:
        conn.close()
