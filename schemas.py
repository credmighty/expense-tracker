from datetime import date
from pydantic import BaseModel, Field

class ExpenseCreate(BaseModel):
    amount: float = Field(gt=0)
    category: str = Field(min_length=1)
    description: str = ""
    date: date
    

class ExpenseOut(ExpenseCreate):
    id: int

    model_config = {"from_attributes": True}