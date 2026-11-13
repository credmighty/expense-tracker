from fastapi import FastAPI

app = FastAPI(title="Expense Tracker")

@app.get("/")
def home():
    return {"message": "Expense tracker is running"}