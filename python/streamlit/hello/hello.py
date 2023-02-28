import streamlit as st
import pandas as pd
import numpy as np
from streamlit_image_select import image_select
from PIL import Image
st.set_page_config(layout="wide")
st.sidebar.title('Hello ')
st.sidebar.text('Hello ')
st.sidebar.text('Hello ')

slider = st.slider('Select a value')

if st.checkbox('Show dataframe'):
    chart_data = pd.DataFrame(
       np.random.randn(slider, 3),
       columns=['a', 'b', 'c'])

    st.line_chart(chart_data)



img = image_select(
    label="Select a cat",
    images=[
        
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        "https://bagongkia.github.io/react-image-picker/0759b6e526e3c6d72569894e58329d89.jpg",
        
    ],
    captions=["A cat", "Another", " cat", "Oh look, a cat!", "Guess what, a cat...", "A cat!", "A cat!", "A cat!", "A cat!", "A cat!", "A cat!", "A cat!", "A cat!", "A cat!", "A cat!", "A cat!"],
    use_container_width=False
)