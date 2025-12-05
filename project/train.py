import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib

print("Loading dataset...")

# Load datasets
train_df = pd.read_csv("train.csv")
test_df = pd.read_csv("test.csv")

# Save test IDs
test_ids = test_df["Id"]

# Drop Id
train_df = train_df.drop("Id", axis=1)
test_df = test_df.drop("Id", axis=1)

# Target
target = "SalePrice"

# Features to use
features = ["OverallQual", "GrLivArea", "GarageCars", "YearBuilt", "TotalBsmtSF"]

# Fill missing values for selected features
train_df[features] = train_df[features].fillna(train_df[features].median())
test_df[features] = test_df[features].fillna(train_df[features].median())

# Split train / validation
mask = np.random.rand(len(train_df)) < 0.8
train_pd = train_df[mask]
valid_pd = train_df[~mask]

X_train = train_pd[features]
y_train = train_pd[target]

X_valid = valid_pd[features]
y_valid = valid_pd[target]

# Train RandomForest
print("Training RandomForest model...")
rf_model = RandomForestRegressor(n_estimators=500, max_depth=20, random_state=42)
rf_model.fit(X_train, y_train)

# Validate
pred_valid = rf_model.predict(X_valid)
rmse = np.sqrt(np.mean((y_valid - pred_valid) ** 2))
print(f"Validation RMSE: {rmse:.2f}")

# Save model and feature list
joblib.dump(rf_model, "rf_model.pkl")
joblib.dump(features, "features.pkl")
print("Model saved as rf_model.pkl and features.pkl")
