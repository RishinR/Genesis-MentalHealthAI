import pickle
import torch
import numpy as np
import sys  # Import the sys module to access command-line arguments

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
with open('tokenizer1.pkl', 'rb') as tokenizer_file:
    tokenizer = pickle.load(tokenizer_file)

token_id = []
attention_masks = []

def preprocessing(input_text, tokenizer):
  '''
  Returns <class transformers.tokenization_utils_base.BatchEncoding> with the following fields:
    - input_ids: list of token ids
    - token_type_ids: list of token type ids
    - attention_mask: list of indices (0,1) specifying which tokens should considered by the model (return_attention_mask = True).
  '''
  return tokenizer.encode_plus(
                        input_text,
                        add_special_tokens = True,
                        max_length = 32,
                        pad_to_max_length = True,
                        return_attention_mask = True,
                        return_tensors = 'pt'
                   )

with open('mental-model1.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

def predict(sentence):
  # We need Token IDs and Attention Mask for inference on the new sentence
  test_ids = []
  test_attention_mask = []

  # Apply the tokenizer
  encoding = preprocessing(sentence, tokenizer)

  # Extract IDs and Attention Mask
  test_ids.append(encoding['input_ids'])
  test_attention_mask.append(encoding['attention_mask'])
  test_ids = torch.cat(test_ids, dim = 0)
  test_attention_mask = torch.cat(test_attention_mask, dim = 0)

  # Forward pass, calculate logit predictions
  with torch.no_grad():
    output = model(test_ids.to(device), token_type_ids = None, attention_mask = test_attention_mask.to(device))
  x = np.argmax(output.logits.cpu().numpy()).flatten().item()
  if x == 1:
    prediction = 'True'
  elif x == 0 :
    prediction = 'False'

  print('Input Sentence: ', sentence)
  return prediction

# Retrieve the input sentence from command-line arguments
def modelOutput(message):
  new_sentence = message # Join all command-line arguments into a single sentence

  # Call the predict function with the input sentence
  prediction = predict(new_sentence)
  return prediction
