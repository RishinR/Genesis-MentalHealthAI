import requests
from flask import Flask, request, jsonify
import conditionModel
import sentimentModel
import sentimentAnalyzer
app = Flask(__name__)

@app.route('/findCondition', methods=['POST'])
def conditionFinder():
    try:
        input_json = request.get_json()
        # print("hello")
        if "message" in input_json:
            input_message = input_json["message"]
            # write out code here
            output = conditionModel.modelOutput(input_message)
            response = {"message": input_message, "response":output}
            return jsonify(response)
        else:
            return jsonify({"error": "Input JSON must contain a 'message' key."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# @app.route('/findSentiment', methods=['POST'])
# def sentimentFinder():
#     try:
#         input_json = request.get_json()
#         # print("hello")
#         if "message" in input_json:
#             input_message = input_json["message"]
#             # write out code here
#             output = sentimentModel.modelOutput(input_message)
#             response = {"message": input_message, "response":output}
#             return jsonify(response)
#         else:
#             return jsonify({"error": "Input JSON must contain a 'message' key."}), 400
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route('/findSentiment', methods=['POST'])
# def sentimentFinder():
#     try:
#         input_json = request.get_json()
#         if "message" in input_json:
#             input_message = input_json["message"]
#             API_URL = "https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-sentiment-analysis"
#             headers = {"Authorization": "Bearer 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"}

#             def query(payload):
#                 response = requests.post(API_URL, headers=headers, json=payload)
#                 return response.json()
                
#             output = query({
#                 "inputs": input_message,
#             })
#             flat_data = [item for sublist in output for item in sublist]

#             # Sort the data by the score in descending order
#             sorted_data = sorted(flat_data, key=lambda x: x["score"], reverse=True)

#             # Get the maximum score and its corresponding label
#             max_score = sorted_data[0]["score"]
#             max_label = sorted_data[0]["label"]
#             print(max_label)
#             # Get the second maximum score and its corresponding label
#             second_max_score = sorted_data[1]["score"]
#             second_max_label = sorted_data[1]["label"]
#             print(second_max_label)

#             if max_label == "NEU":
#                 if second_max_label == "NEG":
#                     return jsonify("True")
#                 else:
#                     return jsonify("False")
#             elif max_label =="NEG":
#                 return jsonify("True")
#             else:
#                 return jsonify("False")
#             # return jsonify(output)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@app.route('/findSentiment', methods=['POST'])
def sentimentFinder():
    try:
        input_json = request.get_json()
        if "message" in input_json:
            input_message = input_json["message"]
            output = sentimentAnalyzer.modelOutput(input_message)
            max_label = output[0]
            second_max_label = output[1]

            if max_label == "neutral":
                if second_max_label == "negative":
                    return jsonify("True")
                else:
                    return jsonify("False")
            elif max_label =="negative":
                return jsonify("True")
            else:
                return jsonify("False")
            # return jsonify(output)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
