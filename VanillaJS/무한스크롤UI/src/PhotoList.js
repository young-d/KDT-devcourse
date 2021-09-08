export default function PhotoList({ $target, initialState, onScrollEnded }) {
    const $photoList = document.createElement('div');
    $photoList.style.alignContent = 'center';
    $target.appendChild($photoList);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    //ul은 초기에 한 번멘 렌더링되고 이후에는 li만 추가로 append
    let isInitialize = false;

    this.render = () => {
        if (!isInitialize) {
            $photoList.innerHTML = `
                <ul class="PhotoList__photos" style="list-style: none; padding: 0;"></ul>
                <button class="PhotoList__loadMore" style="width: 100%; height: 100px; font-size: 20px;">loadMore</button> 
            `;

            isInitialize = true;
        }

        const $photos = $photoList.querySelector('.PhotoList__photos');
        const { photos, isLoading } = this.state;

        photos.forEach(photo => {
            //photo의 id 기준으로 렌더링이 되어있는지 체크
            //loading 중이 아닐 때만 append
            if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null && !isLoading) {
                //없으면 li 생성하고 $photos에 appendChild
                const $li = document.createElement('li');
                $li.setAttribute('data-id', photo.id);
                $li.innerHTML = `<img width="100%" src="${photo.imagePath}" />`;

                $photos.appendChild($li);
            }
        })
    }

    this.render();

    $photoList.addEventListener('click', e => {
        if (e.target.className == 'PhotoList__loadMore') {
            onScrollEnded();
        }
    })
}
